import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { Socket } from 'socket.io-client';
import { ACTIONS } from '../utils/constants';
import { noctisLilac, dracula } from 'thememirror';
import { useTheme } from '../contexts/ThemeContext';

interface EditorProp {
  socketRef: Socket | null;
  roomId: string;
}

const CodeEditor: React.FC<EditorProp> = ({ socketRef, roomId }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const saveCodeToLocal = (code: string, roomId: string) => {
    localStorage.setItem(`code-${roomId}`, code);
  };

  const getCodeFromLocal = (roomId: string): string | null => {
    return localStorage.getItem(`code-${roomId}`);
  };

  const { theme } = useTheme();

  useEffect(() => {
    if (!editorRef.current || !socketRef) return;

    const editorTheme = theme === 'day' ? noctisLilac : dracula;

    const savedCode =
      getCodeFromLocal(roomId) ||
      '// Welcome to ether editor a powerful real-time, collaborative JavaScript editor, designed for live coding sessions\n';

    const startState = EditorState.create({
      doc: savedCode,
      extensions: [
        javascript(),
        editorTheme,
        EditorView.lineWrapping,
        lineNumbers(),
        EditorView.updateListener.of((update) => {
          if (
            update.docChanged &&
            update.transactions.some((tr) => tr.isUserEvent('input'))
          ) {
            const code = update.state.doc.toString();
            socketRef.emit(ACTIONS.CODE_CHANGE, { roomId, code });
            saveCodeToLocal(code, roomId);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    socketRef.on(ACTIONS.REQUEST_CURRENT_CODE, ({ requester }) => {
      const currentCode = view.state.doc.toString();
      socketRef.emit(ACTIONS.SEND_CURRENT_CODE, {
        code: currentCode,
        roomId,
        requester,
      });
    });

    socketRef.on(
      ACTIONS.CODE_CHANGE,
      (data: { roomId: string; code: string }) => {
        if (data.roomId === roomId && view.state.doc.toString() !== data.code) {
          view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: data.code },
          });
        }
      }
    );

    return () => {
      view.destroy();
      socketRef.off(ACTIONS.CODE_CHANGE);
      socketRef.off(ACTIONS.REQUEST_CURRENT_CODE);
    };
  }, [socketRef, roomId, theme]);

  return <div ref={editorRef}></div>;
};

export default CodeEditor;
