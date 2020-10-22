import { Injectable } from '@nestjs/common';
import { Client, MessageEmbed, TextChannel } from 'discord.js';
import { PayloadDto } from './payload.dto';
import { GqlService } from './gql.service';

@Injectable()
export class AppService {
  async getNotification(client: Client, payload: PayloadDto): Promise<void> {
    const username = await GqlService.getAssignee(payload.data.assigneeId);
    const msgEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${payload.type}: ${payload.data.title}`)
      .setURL(payload.url)
      .setAuthor(`Linear ${payload.type} ${payload.action}d`, process.env.COMPANYLOGO)
      .addFields(
        { name: 'Status', value: payload.data.state.name, inline: true },
        { name: 'Assignee', value: username, inline: true },
      )
      .setTimestamp()
      .setFooter(process.env.COMPANYNAME, process.env.COMPANYLOGO);
    const channel = await client.channels.cache.get(process.env.CHANNELID)
        || await client.channels.fetch(process.env.CHANNELID);
    const action = `${payload.type} **${payload.data.title}** has been ${payload.action}d`;
    let body = '';

    if (payload.updatedFrom.assigneeId) {
      body += `\nAssignee has been changed to **${username}**`;
    } if (payload.updatedFrom.state && payload.updatedFrom.state.name) {
      body += `\nStatus has been changed to **${payload.data.state.name}**`;
    } if (payload.updatedFrom.title) {
      body += `\nTitle has been changed to **${payload.data.title}**`;
    }
    const text = action + body;
    await (channel as TextChannel).send(text, msgEmbed);
  }
}
