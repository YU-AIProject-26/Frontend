import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  Play,
  Pause,
  FileText,
  CheckSquare,
  Calendar as CalendarIcon,
  Tag,
  Edit,
  Users,
  Clock,
  TrendingUp,
  Sparkles,
  X,
  Trash2,
  Plus,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  PageWrapper,
  BackLink,
  HeaderSection,
  HeaderTop,
  HeaderLeft,
  HeaderTitleRow,
  PageTitle,
  StatusBadge,
  HeaderMetaRow,
  HeaderMetaItem,
  HeaderActions,
  OutlineButton,
  IconButton,
  HeaderTagsRow,
  TagBadge,
  ContentGrid,
  LeftColumn,
  RightColumn,
  Card,
  CardHeaderRow,
  CardTitle,
  AudioPlayerBody,
  AudioPlayerRow,
  AudioControlButton,
  AudioProgressArea,
  AudioTimeRow,
  ProgressTrack,
  ProgressFill,
  TranscriptList,
  TranscriptItem,
  TranscriptSpeakerRow,
  SpeakerAvatar,
  SpeakerName,
  SpeakerTime,
  HighlightBadge,
  TranscriptText,
  TabsWrapper,
  TabsHeader,
  TabButton,
  ChartSection,
  ParticipationLayout,
  ParticipationLegend,
  ParticipationLegendItem,
  ParticipationLegendLeft,
  ColorDot,
  LegendName,
  LegendValue,
  InsightText,
  SummaryText,
  Separator,
  SectionSubTitle,
  BulletList,
  BulletItem,
  ScoreCard,
  ScoreHeader,
  ScoreValue,
  TodoList,
  TodoItem,
  TodoCheckbox,
  TodoContent,
  TodoText,
  TodoMetaRow,
  TodoMetaText,
  PriorityBadge,
  ScheduleList,
  ScheduleItem,
  DropdownWrapper,
  DropdownMenu,
  DropdownMenuItem,
  EmptyButton,
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalField,
  ModalLabel,
  ModalInput,
  ModalHelperText,
  ModalPrimaryButton,
  ModalSecondaryButton,
  HeaderInlineTitleInput,
  HeaderInlineDateInput,
  HeaderInlineTimeInput,
  HeaderTagEditRow,
  HeaderEditableTag,
  HeaderTagDeleteButton,
  HeaderTagAddForm,
  HeaderTagAddInput,
  HeaderEditActionRow,
  TranscriptEditItem,
  TranscriptEditTopRow,
  TranscriptEditInput,
  TranscriptEditTimeInput,
  TranscriptEditTextarea,
  TranscriptHighlightToggle,
  TranscriptAddButton,
  ToastContainer,
  ToastBox,
  ToastCloseButton,
} from './MeetingDetailPage.styles';

type TranscriptItemType = {
  id: number;
  speaker: string;
  time: string;
  text: string;
  highlight: boolean;
};

type TodoItemType = {
  id: number;
  text: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium';
  completed: boolean;
};

type ScheduleItemType = {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: string;
};

type MeetingInfoType = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  totalSeconds: number;
  status: 'completed';
  tags: string[];
};

const initialMeeting: MeetingInfoType = {
  id: 1,
  title: '주간 마케팅 전략 회의',
  date: '2026-04-07',
  time: '14:00',
  duration: '1시간 23분',
  totalSeconds: 4980,
  status: 'completed',
  tags: ['마케팅', '전략', 'Q2'],
};

const initialTranscript: TranscriptItemType[] = [
  {
    id: 1,
    speaker: '김철수',
    time: '00:02:15',
    text: '안녕하세요. Q2 마케팅 전략 회의를 시작하겠습니다. 오늘은 신규 고객 확보와 예산 배분에 대해 논의하겠습니다.',
    highlight: true,
  },
  {
    id: 2,
    speaker: '이영희',
    time: '00:05:32',
    text: '지난 분기 데이터를 보면 디지털 마케팅의 ROI가 가장 높았어요. 특히 인플루언서 마케팅이 효과적이었습니다.',
    highlight: false,
  },
  {
    id: 3,
    speaker: '박민수',
    time: '00:08:47',
    text: '예산을 디지털에 60% 배정하는 건 어떨까요? 총 3억 중 1.8억을 디지털 마케팅에 투입하는 겁니다.',
    highlight: true,
  },
  {
    id: 4,
    speaker: '최지은',
    time: '00:12:20',
    text: '좋은 제안이네요. 기존 고객 유지를 위한 로열티 프로그램도 개선이 필요합니다.',
    highlight: false,
  },
  {
    id: 5,
    speaker: '정현우',
    time: '00:18:55',
    text: '경쟁사 분석 결과를 보면 우리도 SNS 광고를 더 공격적으로 집행할 필요가 있습니다.',
    highlight: false,
  },
  {
    id: 6,
    speaker: '김철수',
    time: '00:25:10',
    text: '그럼 인플루언서 마케팅 캠페인을 4월 말에 런칭하는 걸로 결정하고, 이영희님이 섭외를 맡아주시면 좋겠습니다.',
    highlight: true,
  },
];

export default function MeetingDetailPage() {
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(245);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'participation' | 'engagement'>(
    'participation'
  );
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const [meeting, setMeeting] = useState<MeetingInfoType>(initialMeeting);
  const [draftMeeting, setDraftMeeting] = useState<MeetingInfoType>(initialMeeting);
  const [isHeaderEditing, setIsHeaderEditing] = useState(false);
  const [newTag, setNewTag] = useState('');

  const [transcriptItems, setTranscriptItems] =
    useState<TranscriptItemType[]>(initialTranscript);

  const [todoItems, setTodoItems] = useState<TodoItemType[]>([
    {
      id: 1,
      text: 'Q2 마케팅 캠페인 상세 기획안 작성',
      assignee: '김철수',
      dueDate: '2026-04-15',
      priority: 'high',
      completed: false,
    },
    {
      id: 2,
      text: '인플루언서 섭외 리스트 작성 및 컨택',
      assignee: '이영희',
      dueDate: '2026-04-12',
      priority: 'high',
      completed: false,
    },
    {
      id: 3,
      text: '디지털 광고 예산 배분 시뮬레이션',
      assignee: '박민수',
      dueDate: '2026-04-10',
      priority: 'medium',
      completed: true,
    },
    {
      id: 4,
      text: '로열티 프로그램 개선안 검토',
      assignee: '최지은',
      dueDate: '2026-04-18',
      priority: 'medium',
      completed: false,
    },
    {
      id: 5,
      text: '경쟁사 마케팅 전략 분석 리포트',
      assignee: '정현우',
      dueDate: '2026-04-14',
      priority: 'high',
      completed: false,
    },
  ]);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    variant: 'success' | 'error';
  }>({
    open: false,
    message: '',
    variant: 'success',
  });

  const summary = {
    main:
      'Q2 마케팅 캠페인 전략 수립 및 예산 논의를 진행했습니다. 신규 고객 타겟팅 전략과 기존 고객 유지 방안을 중심으로 논의했으며, 총 예산 3억원 중 60%를 디지털 마케팅에 집행하기로 결정했습니다.',
    keyPoints: [
      'Q2 목표: 신규 고객 5,000명 확보, MAU 20% 증가',
      '디지털 마케팅 예산 1.8억원 배정 (전체의 60%)',
      '인플루언서 마케팅 캠페인 4월 말 런칭',
      '고객 리텐션을 위한 로열티 프로그램 개선',
      '경쟁사 분석 리포트 다음 주까지 완료',
    ],
    insights:
      '회의 효율성이 높았으며, 참석자들의 참여도가 고르게 분포되어 있습니다. 실행 항목이 명확하게 정리되었고, 담당자와 마감일이 모두 지정되었습니다.',
    score: 82,
  };

  const schedules: ScheduleItemType[] = [
    {
      id: 1,
      title: '인플루언서 킥오프 미팅',
      date: '2026-04-20',
      time: '14:00',
      attendees: '김철수, 이영희',
    },
    {
      id: 2,
      title: 'Q2 캠페인 최종 리뷰',
      date: '2026-04-25',
      time: '10:00',
      attendees: '전체 참석',
    },
    {
      id: 3,
      title: '마케팅 성과 주간 체크인',
      date: '2026-04-14',
      time: '15:00',
      attendees: '마케팅팀',
    },
  ];

  const participantNames = useMemo(() => {
    return Array.from(
      new Set(
        transcriptItems
          .map((item) => item.speaker.trim())
          .filter((speaker) => speaker.length > 0)
      )
    );
  }, [transcriptItems]);

  const participantCount = participantNames.length;

  const participationData = useMemo(() => {
    const countMap = new Map<string, number>();

    transcriptItems.forEach((item) => {
      const speaker = item.speaker.trim();
      if (!speaker) return;
      countMap.set(speaker, (countMap.get(speaker) ?? 0) + 1);
    });

    const colors = ['#2563EB', '#9CA3AF', '#F59E0B', '#EC4899', '#8B5CF6', '#10B981'];
    const total = transcriptItems.filter((item) => item.speaker.trim()).length || 1;

    return Array.from(countMap.entries()).map(([name, count], index) => ({
      name,
      value: Math.round((count / total) * 100),
      color: colors[index % colors.length],
    }));
  }, [transcriptItems]);

  const engagementData = [
    { time: '0-15분', score: 85 },
    { time: '15-30분', score: 92 },
    { time: '30-45분', score: 78 },
    { time: '45-60분', score: 88 },
    { time: '60-75분', score: 82 },
  ];

  useEffect(() => {
    if (!toast.open) return;

    const timer = window.setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        open: false,
      }));
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast.open]);

  const showToast = (message: string, variant: 'success' | 'error' = 'success') => {
    setToast({
      open: true,
      message,
      variant,
    });
  };

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/meetings/${meeting.id}`
      );
      showToast('공유 링크가 복사되었습니다.', 'success');
    } catch (error) {
      console.error('공유 링크 복사 실패:', error);
      showToast('공유 링크 복사에 실패했습니다.', 'error');
    }
  };

  const formatAudioTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDueDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatScheduleDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  const formatMeetingDate = (date: string) => {
    const target = new Date(date);
    return `${target.getFullYear()}년 ${target.getMonth() + 1}월 ${target.getDate()}일`;
  };

  const handleDownloadMeeting = () => {
    try {
      const participantText =
        participantNames.length > 0 ? participantNames.join(', ') : '없음';

      const transcriptText = transcriptItems
        .map((item, index) => {
          return [
            `${index + 1}. [${item.time}] ${item.speaker || '이름 없음'}${
              item.highlight ? ' (핵심 발언)' : ''
            }`,
            item.text,
          ].join('\n');
        })
        .join('\n\n');

      const todoText = todoItems
        .map((item, index) => {
          return [
            `${index + 1}. ${item.text}`,
            `   - 담당자: ${item.assignee}`,
            `   - 마감일: ${item.dueDate}`,
            `   - 우선순위: ${item.priority === 'high' ? '높음' : '중간'}`,
            `   - 상태: ${item.completed ? '완료' : '미완료'}`,
          ].join('\n');
        })
        .join('\n\n');

      const scheduleText = schedules
        .map((item, index) => {
          return [
            `${index + 1}. ${item.title}`,
            `   - 일시: ${item.date} ${item.time}`,
            `   - 참석: ${item.attendees}`,
          ].join('\n');
        })
        .join('\n\n');

      const keyPointText = summary.keyPoints
        .map((item, index) => `${index + 1}. ${item}`)
        .join('\n');

      const txtContent = [
        '==============================',
        '회의 보고서',
        '==============================',
        '',
        '[기본 정보]',
        `회의 제목: ${meeting.title}`,
        `회의 날짜: ${formatMeetingDate(meeting.date)}`,
        `회의 시간: ${meeting.time}`,
        `회의 길이: ${meeting.duration}`,
        `참여 인원: ${participantCount}명`,
        `참여자 목록: ${participantText}`,
        `태그: ${meeting.tags.join(', ')}`,
        '',
        '[회의 요약]',
        summary.main,
        '',
        '[핵심 내용]',
        keyPointText,
        '',
        '[효율성 점수]',
        `${summary.score}점`,
        '',
        '[인사이트]',
        summary.insights,
        '',
        '[실행 항목]',
        todoText,
        '',
        '[생성된 일정]',
        scheduleText,
        '',
        '[대화 내용]',
        transcriptText,
        '',
      ].join('\n');

      const blob = new Blob([txtContent], {
        type: 'text/plain;charset=utf-8',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = `${meeting.title}.txt`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      setIsMoreMenuOpen(false);
      showToast('회의 txt 다운로드가 시작되었습니다.', 'success');
    } catch (error) {
      console.error('txt 다운로드 실패:', error);
      showToast('txt 다운로드에 실패했습니다.', 'error');
    }
  };

  const handleOpenDeleteModal = () => {
    setIsMoreMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    navigate('/meetings');
  };

  const toggleTodo = (todoId: number) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleStartHeaderEdit = () => {
    setDraftMeeting(meeting);
    setNewTag('');
    setIsHeaderEditing(true);
  };

  const handleCancelHeaderEdit = () => {
    setDraftMeeting(meeting);
    setNewTag('');
    setIsHeaderEditing(false);
  };

  const handleSaveHeaderEdit = () => {
    setMeeting(draftMeeting);
    setNewTag('');
    setIsHeaderEditing(false);
  };

  const handleDraftFieldChange = (
    key: keyof Pick<MeetingInfoType, 'title' | 'date' | 'time'>,
    value: string
  ) => {
    setDraftMeeting((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();

    if (!trimmedTag) return;
    if (draftMeeting.tags.includes(trimmedTag)) return;

    setDraftMeeting((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmedTag],
    }));
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setDraftMeeting((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTranscriptChange = (
    transcriptId: number,
    key: keyof Pick<TranscriptItemType, 'speaker' | 'time' | 'text' | 'highlight'>,
    value: string | boolean
  ) => {
    setTranscriptItems((prev) =>
      prev.map((item) =>
        item.id === transcriptId ? { ...item, [key]: value } : item
      )
    );
  };

  const handleDeleteTranscriptItem = (transcriptId: number) => {
    setTranscriptItems((prev) => prev.filter((item) => item.id !== transcriptId));
  };

  const handleAddTranscriptItem = () => {
    const nextId =
      transcriptItems.length > 0
        ? Math.max(...transcriptItems.map((item) => item.id)) + 1
        : 1;

    setTranscriptItems((prev) => [
      ...prev,
      {
        id: nextId,
        speaker: '',
        time: '00:00:00',
        text: '',
        highlight: false,
      },
    ]);
  };

  return (
    <>
      <PageWrapper>
        <BackLink to = "/meetings">
          <ArrowLeft className = "back-icon" />
          회의 목록으로
        </BackLink>

        <HeaderSection>
          <HeaderTop>
            <HeaderLeft>
              <HeaderTitleRow>
                {!isHeaderEditing ? (
                  <PageTitle>{meeting.title}</PageTitle>
                ) : (
                  <HeaderInlineTitleInput
                    value = {draftMeeting.title}
                    onChange = {(e) =>
                      handleDraftFieldChange('title', e.target.value)
                    }
                  />
                )}

                <StatusBadge>완료</StatusBadge>
              </HeaderTitleRow>

              <HeaderMetaRow>
                <HeaderMetaItem>
                  <Clock className = "meta-icon" />
                  {!isHeaderEditing ? (
                    <>
                      {formatMeetingDate(meeting.date)} {meeting.time}
                    </>
                  ) : (
                    <HeaderEditActionRow>
                      <HeaderInlineDateInput
                        type = "date"
                        value = {draftMeeting.date}
                        onChange = {(e) =>
                          handleDraftFieldChange('date', e.target.value)
                        }
                      />
                      <HeaderInlineTimeInput
                        type = "time"
                        value = {draftMeeting.time}
                        onChange = {(e) =>
                          handleDraftFieldChange('time', e.target.value)
                        }
                      />
                    </HeaderEditActionRow>
                  )}
                </HeaderMetaItem>

                <span>•</span>
                <span>{meeting.duration}</span>
                <span>•</span>

                <HeaderMetaItem>
                  <Users className = "meta-icon" />
                  {participantCount}명 참여
                </HeaderMetaItem>
              </HeaderMetaRow>

              {!isHeaderEditing ? (
                <HeaderTagsRow>
                  {meeting.tags.map((tag) => (
                    <TagBadge key = {tag}>
                      <Tag className = "tag-icon" />
                      {tag}
                    </TagBadge>
                  ))}
                </HeaderTagsRow>
              ) : (
                <HeaderTagEditRow>
                  {draftMeeting.tags.map((tag) => (
                    <HeaderEditableTag key = {tag}>
                      <Tag className = "tag-icon" />
                      <span>{tag}</span>
                      <HeaderTagDeleteButton
                        type = "button"
                        onClick = {() => handleRemoveTag(tag)}
                      >
                        <X className = "remove-icon" />
                      </HeaderTagDeleteButton>
                    </HeaderEditableTag>
                  ))}

                  <HeaderTagAddForm>
                    <HeaderTagAddInput
                      value = {newTag}
                      placeholder = "태그 추가"
                      onChange = {(e) => setNewTag(e.target.value)}
                      onKeyDown = {(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <OutlineButton type = "button" onClick = {handleAddTag}>
                      <Plus className = "button-icon" />
                      추가
                    </OutlineButton>
                  </HeaderTagAddForm>
                </HeaderTagEditRow>
              )}
            </HeaderLeft>

            <HeaderActions>
              {!isHeaderEditing ? (
                <>
                  <OutlineButton
                    type = "button"
                    onClick = {() => setIsShareModalOpen(true)}
                  >
                    <Share2 className = "button-icon" />
                    공유
                  </OutlineButton>

                  <OutlineButton type = "button" onClick = {handleStartHeaderEdit}>
                    <Edit className = "button-icon" />
                    수정
                  </OutlineButton>

                  <DropdownWrapper>
                    <IconButton
                      type = "button"
                      onClick = {() => setIsMoreMenuOpen((prev) => !prev)}
                    >
                      <MoreVertical className = "button-icon" />
                    </IconButton>

                    {isMoreMenuOpen && (
                      <DropdownMenu>
                        <DropdownMenuItem
                          type = "button"
                          onClick = {handleDownloadMeeting}
                        >
                          다운로드
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          type = "button"
                          $danger = {true}
                          onClick = {handleOpenDeleteModal}
                        >
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenu>
                    )}
                  </DropdownWrapper>
                </>
              ) : (
                <>
                  <ModalSecondaryButton
                    type = "button"
                    onClick = {handleCancelHeaderEdit}
                  >
                    취소
                  </ModalSecondaryButton>
                  <ModalPrimaryButton
                    type = "button"
                    onClick = {handleSaveHeaderEdit}
                  >
                    저장
                  </ModalPrimaryButton>
                </>
              )}
            </HeaderActions>
          </HeaderTop>
        </HeaderSection>

        <ContentGrid>
          <LeftColumn>
            <Card>
              <CardHeaderRow>
                <CardTitle>음성 플레이어</CardTitle>
              </CardHeaderRow>

              <AudioPlayerBody>
                <AudioPlayerRow>
                  <AudioControlButton
                    type = "button"
                    onClick = {() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className = "play-icon" />
                    ) : (
                      <Play className = "play-icon play-offset" />
                    )}
                  </AudioControlButton>

                  <AudioProgressArea>
                    <AudioTimeRow>
                      <span>{formatAudioTime(currentTime)}</span>
                      <span>{formatAudioTime(meeting.totalSeconds)}</span>
                    </AudioTimeRow>

                    <ProgressTrack>
                      <ProgressFill
                        style = {{
                          width: `${(currentTime / meeting.totalSeconds) * 100}%`,
                        }}
                      />
                    </ProgressTrack>
                  </AudioProgressArea>
                </AudioPlayerRow>
              </AudioPlayerBody>
            </Card>

            <Card>
              <CardHeaderRow>
                <CardTitle>대화 내용</CardTitle>

                <EmptyButton
                  type = "button"
                  onClick = {() => setIsEditingTranscript(!isEditingTranscript)}
                >
                  <Edit className = "button-icon" />
                  {isEditingTranscript ? '완료' : '수정'}
                </EmptyButton>
              </CardHeaderRow>

              <TranscriptList>
                {transcriptItems.map((item) =>
                  !isEditingTranscript ? (
                    <TranscriptItem key = {item.id} $highlight = {item.highlight}>
                      <TranscriptSpeakerRow>
                        <SpeakerAvatar>
                          {item.speaker.trim() ? item.speaker.trim()[0] : '?'}
                        </SpeakerAvatar>
                        <SpeakerName>{item.speaker || '이름 없음'}</SpeakerName>
                        <SpeakerTime>{item.time}</SpeakerTime>

                        {item.highlight && (
                          <HighlightBadge>
                            <Sparkles className = "highlight-icon" />
                            핵심 발언
                          </HighlightBadge>
                        )}
                      </TranscriptSpeakerRow>

                      <TranscriptText>{item.text}</TranscriptText>
                    </TranscriptItem>
                  ) : (
                    <TranscriptEditItem key = {item.id}>
                      <TranscriptEditTopRow>
                        <TranscriptEditInput
                          value = {item.speaker}
                          placeholder = "화자 이름"
                          onChange = {(e) =>
                            handleTranscriptChange(item.id, 'speaker', e.target.value)
                          }
                        />

                        <TranscriptEditTimeInput
                          value = {item.time}
                          placeholder = "00:00:00"
                          onChange = {(e) =>
                            handleTranscriptChange(item.id, 'time', e.target.value)
                          }
                        />

                        <TranscriptHighlightToggle
                          type = "button"
                          $active = {item.highlight}
                          onClick = {() =>
                            handleTranscriptChange(
                              item.id,
                              'highlight',
                              !item.highlight
                            )
                          }
                        >
                          <Sparkles className = "toggle-icon" />
                          핵심 발언
                        </TranscriptHighlightToggle>

                        <IconButton
                          type = "button"
                          onClick = {() => handleDeleteTranscriptItem(item.id)}
                        >
                          <Trash2 className = "button-icon" />
                        </IconButton>
                      </TranscriptEditTopRow>

                      <TranscriptEditTextarea
                        value = {item.text}
                        placeholder = "대화 내용을 입력하세요"
                        onChange = {(e) =>
                          handleTranscriptChange(item.id, 'text', e.target.value)
                        }
                      />
                    </TranscriptEditItem>
                  )
                )}

                {isEditingTranscript && (
                  <TranscriptAddButton type = "button" onClick = {handleAddTranscriptItem}>
                    <Plus className = "button-icon" />
                    화자 대화 추가
                  </TranscriptAddButton>
                )}
              </TranscriptList>
            </Card>

            <Card>
              <CardHeaderRow>
                <CardTitle>회의 분석</CardTitle>
              </CardHeaderRow>

              <TabsWrapper>
                <TabsHeader>
                  <TabButton
                    type = "button"
                    $active = {activeTab === 'participation'}
                    onClick = {() => setActiveTab('participation')}
                  >
                    참여도 분석
                  </TabButton>

                  <TabButton
                    type = "button"
                    $active = {activeTab === 'engagement'}
                    onClick = {() => setActiveTab('engagement')}
                  >
                    시간별 몰입도
                  </TabButton>
                </TabsHeader>

                {activeTab === 'participation' && (
                  <ChartSection>
                    <ParticipationLayout>
                      <div style = {{ width: '16rem', height: '16rem' }}>
                        <ResponsiveContainer width = "100%" height = "100%">
                          <PieChart>
                            <Pie
                              data = {participationData}
                              cx = "50%"
                              cy = "50%"
                              labelLine = {false}
                              outerRadius = {80}
                              fill = "#8884d8"
                              dataKey = "value"
                            >
                              {participationData.map((entry, index) => (
                                <Cell key = {`cell-${index}`} fill = {entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <ParticipationLegend>
                        {participationData.map((participant, index) => (
                          <ParticipationLegendItem key = {index}>
                            <ParticipationLegendLeft>
                              <ColorDot style = {{ backgroundColor: participant.color }} />
                              <LegendName>{participant.name}</LegendName>
                            </ParticipationLegendLeft>

                            <LegendValue>{participant.value}%</LegendValue>
                          </ParticipationLegendItem>
                        ))}
                      </ParticipationLegend>
                    </ParticipationLayout>
                  </ChartSection>
                )}

                {activeTab === 'engagement' && (
                  <ChartSection>
                    <div style = {{ width: '100%', height: '12.5rem' }}>
                      <ResponsiveContainer width = "100%" height = "100%">
                        <BarChart data = {engagementData}>
                          <XAxis dataKey = "time" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey = "score"
                            fill = "#2563EB"
                            radius = {[8, 8, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <InsightText>
                      전체적으로 높은 몰입도를 유지했습니다. 30-45분 구간에서 약간
                      감소했지만, 이후 회복되었습니다.
                    </InsightText>
                  </ChartSection>
                )}
              </TabsWrapper>
            </Card>
          </LeftColumn>

          <RightColumn>
            <Card>
              <CardHeaderRow>
                <CardTitle>
                  <FileText className = "title-icon blue" />
                  회의 요약
                </CardTitle>
              </CardHeaderRow>

              <SummaryText>{summary.main}</SummaryText>

              <Separator />

              <SectionSubTitle>핵심 내용</SectionSubTitle>

              <BulletList>
                {summary.keyPoints.map((point, index) => (
                  <BulletItem key = {index}>{point}</BulletItem>
                ))}
              </BulletList>
            </Card>

            <ScoreCard>
              <ScoreHeader>
                <CardTitle>
                  <TrendingUp className = "title-icon blue" />
                  효율성 점수
                </CardTitle>

                <ScoreValue>{summary.score}</ScoreValue>
              </ScoreHeader>

              <ProgressTrack>
                <ProgressFill style = {{ width: `${summary.score}%` }} />
              </ProgressTrack>

              <InsightText>{summary.insights}</InsightText>
            </ScoreCard>

            <Card>
              <CardHeaderRow>
                <CardTitle>
                  <CheckSquare className = "title-icon green" />
                  실행 항목
                </CardTitle>
              </CardHeaderRow>

              <TodoList>
                {todoItems.map((todo) => (
                  <TodoItem key = {todo.id}>
                    <TodoCheckbox
                      checked = {todo.completed}
                      onChange = {() => toggleTodo(todo.id)}
                    />

                    <TodoContent>
                      <TodoText $completed = {todo.completed}>
                        {todo.text}
                      </TodoText>

                      <TodoMetaRow>
                        <TodoMetaText>{todo.assignee}</TodoMetaText>
                        <TodoMetaText>•</TodoMetaText>
                        <TodoMetaText>{formatDueDate(todo.dueDate)}</TodoMetaText>

                        {todo.priority === 'high' && (
                          <PriorityBadge>긴급</PriorityBadge>
                        )}
                      </TodoMetaRow>
                    </TodoContent>
                  </TodoItem>
                ))}
              </TodoList>
            </Card>

            <Card>
              <CardHeaderRow>
                <CardTitle>
                  <CalendarIcon className = "title-icon blue" />
                  생성된 일정
                </CardTitle>
              </CardHeaderRow>

              <ScheduleList>
                {schedules.map((schedule) => (
                  <ScheduleItem key = {schedule.id}>
                    <p className = "schedule-title">{schedule.title}</p>
                    <p className = "schedule-date">
                      {formatScheduleDate(schedule.date)} {schedule.time}
                    </p>
                    <p className = "schedule-attendees">
                      참석: {schedule.attendees}
                    </p>
                  </ScheduleItem>
                ))}
              </ScheduleList>
            </Card>
          </RightColumn>
        </ContentGrid>

        {isShareModalOpen && (
          <ModalOverlay onClick = {() => setIsShareModalOpen(false)}>
            <ModalCard onClick = {(e) => e.stopPropagation()}>
              <ModalHeader>
                <div>
                  <ModalTitle>회의 공유</ModalTitle>
                  <ModalDescription>
                    {meeting.title} 회의를 공유할 수 있습니다.
                  </ModalDescription>
                </div>

                <ModalCloseButton
                  type = "button"
                  onClick = {() => setIsShareModalOpen(false)}
                >
                  <X className = "close-icon" />
                </ModalCloseButton>
              </ModalHeader>

              <ModalBody>
                <ModalField>
                  <ModalLabel>공유 링크</ModalLabel>
                  <ModalInput
                    value = {`${window.location.origin}/meetings/${meeting.id}`}
                    readOnly
                  />
                  <ModalHelperText>
                    링크를 복사해 팀원과 공유할 수 있습니다.
                  </ModalHelperText>
                </ModalField>
              </ModalBody>

              <ModalFooter>
                <ModalSecondaryButton
                  type = "button"
                  onClick = {() => setIsShareModalOpen(false)}
                >
                  닫기
                </ModalSecondaryButton>

                <ModalPrimaryButton
                  type = "button"
                  onClick = {handleCopyShareLink}
                >
                  공유 링크 복사
                </ModalPrimaryButton>
              </ModalFooter>
            </ModalCard>
          </ModalOverlay>
        )}

        {isDeleteModalOpen && (
          <ModalOverlay onClick = {handleCloseDeleteModal}>
            <ModalCard onClick = {(e) => e.stopPropagation()}>
              <ModalHeader>
                <div>
                  <ModalTitle>회의를 삭제하시겠습니까?</ModalTitle>
                  <ModalDescription>
                    삭제한 회의는 목록에서 더 이상 표시되지 않습니다.
                  </ModalDescription>
                </div>

                <ModalCloseButton
                  type = "button"
                  onClick = {handleCloseDeleteModal}
                >
                  <X className = "close-icon" />
                </ModalCloseButton>
              </ModalHeader>

              <ModalBody>
                <ModalField>
                  <ModalLabel>회의 제목</ModalLabel>
                  <ModalInput value = {meeting.title} readOnly />
                </ModalField>

                <ModalField>
                  <ModalLabel>삭제 안내</ModalLabel>
                  <ModalHelperText>
                    삭제 후에는 이 회의를 다시 확인할 수 없습니다.
                  </ModalHelperText>
                </ModalField>
              </ModalBody>

              <ModalFooter>
                <ModalSecondaryButton
                  type = "button"
                  onClick = {handleCloseDeleteModal}
                >
                  취소
                </ModalSecondaryButton>

                <ModalPrimaryButton
                  type = "button"
                  onClick = {handleConfirmDelete}
                >
                  삭제하기
                </ModalPrimaryButton>
              </ModalFooter>
            </ModalCard>
          </ModalOverlay>
        )}
      </PageWrapper>

      {toast.open && (
        <ToastContainer>
          <ToastBox $variant = {toast.variant}>
            <span>{toast.message}</span>

            <ToastCloseButton type = "button" onClick = {closeToast}>
              <X className = "toast-close-icon" />
            </ToastCloseButton>
          </ToastBox>
        </ToastContainer>
      )}
    </>
  );
}