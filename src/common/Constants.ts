export type RoleType = 'user' | 'admin' | 'partner';
export type LevelType = 'unskilled' | 'secondary' | 'high' | 'students' | 'university' | 'postgraduate';
export type GenderType = 'male' | 'female';
export const Prefix = '/api/v1/';
export enum ROLE {
  ADMIN = 'admin',
  PARTNER = 'partner',
  USER = 'user',
}
export type ConnectionName =
  | 'province'
  | 'notification'
  | 'jobs'
  | 'interview'
  | 'district'
  | 'commune'
  | 'medical_record'
  | 'fieldSelected'
  | 'fields';

export enum JobType {
  'ACCEPTED' = 'ACCEPTED',
  'WAITING' = 'WAITING',
  'CREATED' = 'CREATED',
  'jobRecived' = 'jobRecived',
  'requestInterviewRecived' = 'requestInterviewRecived',
}
export default {
  socket: {
    OFFER: 'OFFER',
    ANSWER: 'ANSWER',
    CANDIDATE: 'CANDIDATE',
    LEAVE: 'LEAVE',
    REJECT: 'REJECT',
    DELINE: 'DELINE',
    DISCONNECT: 'DISCONNECT',
    CONNECT: 'connectFirebase',
    CHECKING: 'CHECKING',
    GET_LIST_GROUP: 'GET_LIST_GROUP',
    SEND_MESSAGE: 'SEND_MESSAGE',
    CREATE_ROOM: 'CREATE_ROOM',
    CALLING: 'CALLING',
    CALLED: 'CALLED',
    STREAM: 'STREAM',
    JOIN_ROOM: 'JOIN_ROOM',
    LEAVE_ROOM: 'LEAVE_ROOM',
    MESSAGE: 'MESSAGE',
    TYPING: 'TYPING',
    INCOMINGCALL: 'INCOMINGCALL',
  },
};
