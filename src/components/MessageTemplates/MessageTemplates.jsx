import React from 'react';
import { Actions, withTheme, IconButton, Manager, TaskHelper } from '@twilio/flex-ui';

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

const SAMPLE_MSG = "This is a sample message template/macro for responsing to a customer inquiry.";

class MessageTemplates extends React.Component {

  constructor(props) {
    super(props);

  }

  sendMessage = async (messageBody) => {
    //May Need better way to get the channel Sid for the chat the agent is working on
    let _manager = Manager.getInstance();
    let flexState = _manager.store.getState().flex;
    let reservationSid = flexState.view.selectedTaskSid;
    console.log('Selected Task/Res = ', reservationSid);
    let task = TaskHelper.getTaskByTaskSid(reservationSid);
    let chanSid = TaskHelper.getTaskChatChannelSid(task);
    console.log('Channel Sid =', chanSid);
    if (chanSid) {
      Actions.invokeAction('SendMessage', { body: messageBody, channelSid: chanSid });
    }

  }

  render() {
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
            <TableRow key="msg1">
              <TableCell>

                <Message
                  title='Send Response'
                  onClick={() => {
                    this.sendMessage(SAMPLE_MSG);
                  }}
                />

              </TableCell>

              <TableCell><MessageStyle> {SAMPLE_MSG}  </MessageStyle></TableCell>
              <TableCell><MessageStyle> Jane Doe </MessageStyle></TableCell>
              <TableCell><MessageStyle> Today's date </MessageStyle></TableCell>
              <TableCell><MessageStyle> Other value </MessageStyle></TableCell>
            </TableRow>

          </TableBody>

        </Table>
      </div>
    );
  };
}

export default MessageTemplates;
