import React from 'react';

import ChatBubbleBottomCenterIcon from '@heroicons/react/24/outline/ChatBubbleBottomCenterIcon';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';


type Props = {
  text: string,
};

export const OcrImporterText = ({text}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <Flex noFullWidth className="w-full p-2 sm:w-[60vw]">
          <pre className="rounded-lg p-2 shadow-border shadow-slate-500">
            {text}
          </pre>
        </Flex>
      </PopupCommon>
      <button onClick={() => setShow(true)} className="button-clickable-border self-end p-1">
        <ChatBubbleBottomCenterIcon className="h-6 w-6"/>
      </button>
    </>
  );
};
