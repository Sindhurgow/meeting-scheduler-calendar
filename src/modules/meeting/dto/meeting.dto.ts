import { IMeeting } from '../interface/meeting.interface';

export type CreateMeetingDto = Pick<IMeeting, 'userId' | 'title' | 'startTime' | 'endTime'>;

export type UpdateMeetingDto = Partial<Omit<CreateMeetingDto, 'userId'>>;

export type MeetingResponseDto = IMeeting;