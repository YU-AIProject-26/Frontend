import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Mic,
  Upload,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  CalendarDays,
  MoreVertical,
} from 'lucide-react';
import Calendar from '../components/Calendar';
import {
  PageWrapper,
  EmptyStateWrapper,
  EmptyActionRow,
  HeaderSection,
  HeaderLeft,
  HeaderTitle,
  HeaderDescription,
  HeaderButtonGroup,
  PrimaryActionButton,
  OutlineActionButton,
  EmptyCard,
  EmptyIconBox,
  EmptyTitle,
  EmptyDescription,
  EmptyButtonRow,
  StatsGrid,
  StatCard,
  StatHeader,
  StatLabel,
  StatValue,
  StatSubText,
  MainCard,
  SectionHeader,
  SectionTitle,
  SectionLinkButton,
  MeetingsList,
  MeetingLink,
  MeetingCard,
  MeetingTop,
  MeetingLeft,
  MeetingTitle,
  MeetingMeta,
  MeetingSummary,
  MeetingActions,
  StatusBadge,
  TodoCalendarGrid,
  TodoListCard,
  CalendarSideCard,
  TodoList,
  TodoItem,
  TodoCheck,
  TodoContent,
  TodoText,
  TodoMetaRow,
  TodoMetaText,
  CalendarSectionHeader,
  CalendarTop,
  CalendarBlock,
  UpcomingSection,
  UpcomingTitle,
  UpcomingList,
  UpcomingItem,
  UpcomingDateBox,
  UpcomingMonth,
  UpcomingDay,
  UpcomingContent,
  UpcomingEventTitle,
  UpcomingEventTime,
} from './DashboardPage.styles';

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hasData] = useState(true);

  const recentMeetings = [
    {
      id: 1,
      title: '주간 마케팅 전략 회의',
      date: '2026년 4월 7일 14:00',
      status: 'completed' as const,
      summary: 'Q2 마케팅 캠페인 전략 수립 및 예산 논의',
      duration: '1시간 23분',
    },
    {
      id: 2,
      title: '제품 로드맵 리뷰',
      date: '2026년 4월 6일 10:00',
      status: 'analyzing' as const,
      summary: '분석 중...',
      duration: '2시간 15분',
    },
    {
      id: 3,
      title: '고객 피드백 세션',
      date: '2026년 4월 5일 16:00',
      status: 'completed' as const,
      summary: '주요 고객 요청사항 수집 및 우선순위 결정',
      duration: '45분',
    },
  ];

  const todos = [
    {
      id: 1,
      text: '마케팅 캠페인 예산안 작성',
      assignee: '김철수',
      dueDate: '4월 10일',
      completed: false,
    },
    {
      id: 2,
      text: 'Q2 제품 로드맵 문서화',
      assignee: '이영희',
      dueDate: '4월 12일',
      completed: false,
    },
    {
      id: 3,
      text: '고객 피드백 리포트 공유',
      assignee: '박민수',
      dueDate: '4월 8일',
      completed: true,
    },
    {
      id: 4,
      text: '다음 주 회의 일정 조율',
      assignee: '최지은',
      dueDate: '4월 9일',
      completed: false,
    },
  ];

  const upcomingEvents = [
    { date: '4월 8일', time: '10:00', title: '팀 스탠드업' },
    { date: '4월 10일', time: '14:00', title: '월간 리뷰' },
    { date: '4월 12일', time: '15:00', title: '1:1 미팅' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <StatusBadge $variant = "completed">
            <CheckCircle2 className = "status-icon" />
            완료
          </StatusBadge>
        );
      case 'analyzing':
        return (
          <StatusBadge $variant = "analyzing">
            <Loader2 className = "status-icon status-spin" />
            분석중
          </StatusBadge>
        );
      case 'failed':
        return (
          <StatusBadge $variant = "failed">
            <XCircle className = "status-icon" />
            실패
          </StatusBadge>
        );
      default:
        return null;
    }
  };

  if (!hasData) {
    return (
      <PageWrapper>
        <EmptyStateWrapper>
          <EmptyActionRow>
            <PrimaryActionButton type = "button">
              <Mic className = "action-icon" />
              녹음하기
            </PrimaryActionButton>
            <OutlineActionButton type = "button">
              <Upload className = "action-icon" />
              파일 업로드
            </OutlineActionButton>
          </EmptyActionRow>

          <EmptyCard>
            <EmptyIconBox>
              <FileText />
            </EmptyIconBox>
            <EmptyTitle>아직 회의가 없습니다</EmptyTitle>
            <EmptyDescription>
              첫 회의를 녹음하거나 파일을 업로드하여 AI 분석을 시작해보세요
            </EmptyDescription>
            <EmptyButtonRow>
              <PrimaryActionButton type = "button">
                <Mic className = "action-icon" />
                녹음 시작
              </PrimaryActionButton>
              <OutlineActionButton type = "button">
                <Upload className = "action-icon" />
                파일 업로드
              </OutlineActionButton>
            </EmptyButtonRow>
          </EmptyCard>
        </EmptyStateWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <HeaderSection>
        <HeaderLeft>
          <HeaderTitle>대시보드</HeaderTitle>
          <HeaderDescription>
            회의 분석과 Todo를 한눈에 확인하세요
          </HeaderDescription>
        </HeaderLeft>

        <HeaderButtonGroup>
          <PrimaryActionButton type = "button">
            <Mic className = "action-icon" />
            녹음하기
          </PrimaryActionButton>
          <OutlineActionButton type = "button">
            <Upload className = "action-icon" />
            파일 업로드
          </OutlineActionButton>
        </HeaderButtonGroup>
      </HeaderSection>

      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatLabel>전체 회의</StatLabel>
            <FileText className = "stat-icon" />
          </StatHeader>
          <StatValue>24</StatValue>
          <StatSubText $accent>+3 이번 주</StatSubText>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatLabel>완료된 Todo</StatLabel>
            <CheckCircle2 className = "stat-icon" />
          </StatHeader>
          <StatValue>47</StatValue>
          <StatSubText>진행중 18개</StatSubText>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatLabel>예정된 일정</StatLabel>
            <CalendarDays className = "stat-icon" />
          </StatHeader>
          <StatValue>8</StatValue>
          <StatSubText $accent>이번 주 3개</StatSubText>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatLabel>총 회의 시간</StatLabel>
            <Clock className = "stat-icon" />
          </StatHeader>
          <StatValue>32h</StatValue>
          <StatSubText>이번 달</StatSubText>
        </StatCard>
      </StatsGrid>

      <MainCard>
        <SectionHeader>
          <SectionTitle>최근 회의</SectionTitle>
          <SectionLinkButton to="/dashboard/meetings">
            모두 보기
            <ArrowRight className = "link-arrow" />
          </SectionLinkButton>
        </SectionHeader>

        <MeetingsList>
          {recentMeetings.map((meeting) => (
            <MeetingLink key = {meeting.id} to = {`/dashboard/meetings/${meeting.id}`}>
              <MeetingCard>
                <MeetingTop>
                  <MeetingLeft>
                    <MeetingTitle>{meeting.title}</MeetingTitle>
                    <MeetingMeta>
                      <span className = "meeting-meta-item">
                        <Clock className = "meeting-meta-icon" />
                        {meeting.date}
                      </span>
                      <span>•</span>
                      <span>{meeting.duration}</span>
                    </MeetingMeta>
                  </MeetingLeft>

                  <MeetingActions>
                    {getStatusBadge(meeting.status)}
                    <button type = "button" aria-label = "more">
                      <MoreVertical className = "meeting-more-icon" />
                    </button>
                  </MeetingActions>
                </MeetingTop>

                <MeetingSummary>{meeting.summary}</MeetingSummary>
              </MeetingCard>
            </MeetingLink>
          ))}
        </MeetingsList>
      </MainCard>

      <TodoCalendarGrid>
        <TodoListCard>
          <SectionHeader>
            <SectionTitle>오늘의 Todo</SectionTitle>
            <SectionLinkButton to = "/dashboard/todo">
              모두 보기
              <ArrowRight className = "link-arrow" />
            </SectionLinkButton>
          </SectionHeader>

          <TodoList>
            {todos.slice(0, 5).map((todo) => (
              <TodoItem key = {todo.id}>
                <TodoCheck type = "checkbox" checked = {todo.completed} readOnly />
                <TodoContent>
                  <TodoText $completed = {todo.completed}>{todo.text}</TodoText>
                  <TodoMetaRow>
                    <TodoMetaText>{todo.assignee}</TodoMetaText>
                    <TodoMetaText>•</TodoMetaText>
                    <TodoMetaText>{todo.dueDate}</TodoMetaText>
                  </TodoMetaRow>
                </TodoContent>
              </TodoItem>
            ))}
          </TodoList>
        </TodoListCard>

        <CalendarSideCard>
          <CalendarSectionHeader>
            <SectionTitle>일정 캘린더</SectionTitle>
            <SectionLinkButton to = "/dashboard/calendar">
              모두 보기
              <ArrowRight className = "link-arrow" />
            </SectionLinkButton>
          </CalendarSectionHeader>

          <CalendarTop>
            <CalendarBlock>
              <Calendar
                mode = "single"
                selected = {date}
                onSelect = {setDate}
                className = "dashboard-calendar"
              />
            </CalendarBlock>
          </CalendarTop>

          <UpcomingSection>
            <UpcomingTitle>다가오는 일정</UpcomingTitle>

            <UpcomingList>
              {upcomingEvents.map((event, index) => (
                <UpcomingItem key = {index}>
                  <UpcomingDateBox>
                    <UpcomingMonth>4월</UpcomingMonth>
                    <UpcomingDay>
                      {event.date.split('월 ')[1].replace('일', '')}
                    </UpcomingDay>
                  </UpcomingDateBox>

                  <UpcomingContent>
                    <UpcomingEventTitle>{event.title}</UpcomingEventTitle>
                    <UpcomingEventTime>{event.time}</UpcomingEventTime>
                  </UpcomingContent>
                </UpcomingItem>
              ))}
            </UpcomingList>
          </UpcomingSection>
        </CalendarSideCard>
      </TodoCalendarGrid>
    </PageWrapper>
  );
}