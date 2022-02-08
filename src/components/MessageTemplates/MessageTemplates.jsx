import React, { useState, useEffect } from 'react';
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
    const [showTaskUpdate, setShowTaskUpdate] = useState(false);
    useEffect(() => {
        if (!task) {
            return setShowTaskUpdate(false);
        }
        if (task.status === 'wrapping') {
            setShowTaskUpdate(true);
        } else {
            setShowTaskUpdate(false);
        }
    }, [task?.status])

    const messages = [
        {
            body: "This is a sample message template/macro for responsing to a customer inquiry."
        },
        {
            body: "Sample Message 2"
        },
        {
            body: "Hello %custName%, nice to meet you."
        }
    ];

    const sendMessage = async (messageTemplate) => {
        const chanSid = TaskHelper.getTaskChatChannelSid(task);
        const messageBody = parseMessageTemplate(messageTemplate);

        if (chanSid) {
            Actions.invokeAction('SendMessage', { body: messageBody, channelSid: chanSid });
        }
    };

    const parseMessageTemplate = (body) => {
        if (body.includes('%custName%')) {
            return body.replace('%custName%', getCustomerName(task));
        }
        return body;
    };

    const getCustomerName = (task) => {
        return task.attributes.customerName || 'Jane Doe';
    };

    const updateTask = async (task) => {
        let attributes = task.attributes;
        attributes.resolution = true;
        return await task.setAttributes(attributes);
    };

    if (!task) {
        return null;
    }

    return (
        <>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Click to Send </TableCell>
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
                                <TableCell><MessageStyle> {getCustomerName(task)} </MessageStyle></TableCell>
                                <TableCell><MessageStyle> Today's date </MessageStyle></TableCell>
                                <TableCell><MessageStyle> Other value </MessageStyle></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {
                showTaskUpdate && (<Button variant="contained" color="primary" onClick={() => updateTask(task)}>Update Task!</Button>)
            }
        </>
    );
}

export default withTaskContext(MessageTemplates);
