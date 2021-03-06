import React from 'react';
import { VERSION, Notifications } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import MessageTemplates from './components/MessageTemplates/MessageTemplates';
import reducers, { namespace } from './states';
import { CompleteTaskBlocked } from './notifications';

const PLUGIN_NAME = 'MessageTemplatesPlugin';

export default class MessageTemplatesPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    // const options = { sortOrder: -1 };
    //flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="MessageTemplatesPlugin-component" />, options);
      
    Notifications.registerNotification(CompleteTaskBlocked);

    flex.Actions.addListener('beforeCompleteTask', (payload, abortFunction) => {
        const { task } = payload;
        if (!task.attributes.hasOwnProperty('resolution')) {
            Notifications.showNotification("CompleteTaskBlocked");
            return abortFunction();
        }
    });

    flex.CRMContainer.Content.replace(
      <MessageTemplates key="msg-templates" />
    );

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
