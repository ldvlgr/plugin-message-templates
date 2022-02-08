import React from 'react';
import { Actions, TaskHelper, withTaskContext } from '@twilio/flex-ui';

import {
  Button,
  TableHead,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Message from "@material-ui/icons/Message";
import { MessageStyle } from './MessageTemplates.styles';

const MessageTemplates = ({ task }) => {

    const messages = [
        {
            body: "This is a sample message template/macro for responsing to a customer inquiry."
        },
        {
            body: "Sample Message 2"
        }
    ];

    const sendMessage = async (messageBody) => {
        let chanSid = TaskHelper.getTaskChatChannelSid(task);
        if (chanSid) {
            Actions.invokeAction('SendMessage', { body: messageBody, channelSid: chanSid });
        }
    };

    return (
        <div>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell> Click to Send </TableCell>
                    <TableCell>Message Template</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Custom Field 1</TableCell>
                    <TableCell>Custom Field 2</TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    {messages.map((msg, index) => {
                        return (
                            <TableRow key={`msg-${index}`}>
                                <TableCell>

                                    <Message
                                    title='Send Response'
                                    onClick={() => {
                                        sendMessage(msg.body);
                                    }}
                                    />

                                </TableCell>
                                <TableCell><MessageStyle> {msg.body}  </MessageStyle></TableCell>
                                <TableCell><MessageStyle> Jane Doe </MessageStyle></TableCell>
                                <TableCell><MessageStyle> Today's date </MessageStyle></TableCell>
                                <TableCell><MessageStyle> Other value </MessageStyle></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default withTaskContext(MessageTemplates);
