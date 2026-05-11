import { useMemo, useState } from 'react';
import {
  Search,
  ChevronRight,
  FileText,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  X,
} from 'lucide-react';
import {
  AdminSubPageWrapper,
  SubPageHeader,
  SubPageTitle,
  SubPageDescription,
  SubPageTopRow,
  SubPagePrimaryLink,
  SearchFilterRow,
  SearchInputWrapper,
  SearchInput,
  FilterSelect,
  DataCard,
  DataTable,
  TableBadge,
  TableActionRow,
  TableActionButton,
  SummaryRow,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  ModalOverlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalPrimaryButton,
  ModalSecondaryButton,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  OptionList,
  OptionButton,
  EmptyStateBox,
  EmptyStateText,
} from './AdminSubPage.styles';

type MeetingStatus = '분석 완료' | '분석중' | '실패';

type MeetingItem = {
  id: number;
  title: string;
  owner: string;
  createdAt: string;
  status: MeetingStatus;
  todos: number;
  duration: string;
  participants: number;
  summary: string;
};

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<MeetingItem[]>([
    {
      id: 1,
      title: '주간 마케팅 전략 회의',
      owner: '관리자',
      createdAt: '2026.05.12 09:40',
      status: '분석 완료',
      todos: 6,
      duration: '1시간 12분',
      participants: 5,
      summary:
        '캠페인 일정 조정, 예산 분배, 팀별 실행 항목 정리가 완료된 회의입니다.',
    },
    {
      id: 2,
      title: '제품 로드맵 리뷰',
      owner: '테스트 사용자',
      createdAt: '2026.05.12 08:20',
      status: '분석중',
      todos: 3,
      duration: '48분',
      participants: 4,
      summary:
        '분기별 기능 우선순위와 개발 일정 조율을 위한 회의입니다.',
    },
    {
      id: 3,
      title: '고객 피드백 세션',
      owner: '민수',
      createdAt: '2026.05.11 16:00',
      status: '분석 완료',
      todos: 4,
      duration: '36분',
      participants: 3,
      summary:
        '고객 불편 사항과 개선 요청을 정리하고 우선순위를 논의한 회의입니다.',
    },
    {
      id: 4,
      title: '실험용 실패 회의',
      owner: '지은',
      createdAt: '2026.05.11 11:10',
      status: '실패',
      todos: 0,
      duration: '15분',
      participants: 2,
      summary:
        '음성 처리 오류로 인해 분석이 실패한 테스트 회의입니다.',
    },
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | MeetingStatus>('all');

  const [selectedMeeting, setSelectedMeeting] = useState<MeetingItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
      const keyword = searchKeyword.trim().toLowerCase();

      const matchesKeyword =
        keyword.length === 0
          ? true
          : meeting.title.toLowerCase().includes(keyword) ||
            meeting.owner.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === 'all' ? true : meeting.status === statusFilter;

      return matchesKeyword && matchesStatus;
    });
  }, [meetings, searchKeyword, statusFilter]);

  const summary = useMemo(() => {
    return {
      total: meetings.length,
      completed: meetings.filter((item) => item.status === '분석 완료').length,
      analyzing: meetings.filter((item) => item.status === '분석중').length,
      failed: meetings.filter((item) => item.status === '실패').length,
    };
  }, [meetings]);

  const openDetailModal = (meeting: MeetingItem) => {
    setSelectedMeeting(meeting);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedMeeting(null);
  };

  const openStatusModal = (meeting: MeetingItem) => {
    setSelectedMeeting(meeting);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedMeeting(null);
  };

  const openDeleteModal = (meeting: MeetingItem) => {
    setSelectedMeeting(meeting);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleChangeStatus = (nextStatus: MeetingStatus) => {
    if (!selectedMeeting) return;

    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === selectedMeeting.id
          ? { ...meeting, status: nextStatus }
          : meeting
      )
    );

    closeStatusModal();
  };

  const handleDeleteMeeting = () => {
    if (!selectedMeeting) return;

    setMeetings((prev) =>
      prev.filter((meeting) => meeting.id !== selectedMeeting.id)
    );

    closeDeleteModal();
  };

  return (
    <>
      <AdminSubPageWrapper>
        <SubPageHeader>
          <SubPageTopRow>
            <div>
              <SubPageTitle>회의 데이터 관리</SubPageTitle>
              <SubPageDescription>
                회의 목록과 분석 상태, 생성 데이터를 관리합니다
              </SubPageDescription>
            </div>

            <SubPagePrimaryLink to = "/admin">
              관리자 메인으로
              <ChevronRight className = "link-arrow" />
            </SubPagePrimaryLink>
          </SubPageTopRow>
        </SubPageHeader>

        <SummaryRow>
          <SummaryCard>
            <SummaryLabel>전체 회의</SummaryLabel>
            <SummaryValue>{summary.total}</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>분석 완료</SummaryLabel>
            <SummaryValue>{summary.completed}</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>분석중</SummaryLabel>
            <SummaryValue>{summary.analyzing}</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>실패</SummaryLabel>
            <SummaryValue>{summary.failed}</SummaryValue>
          </SummaryCard>
        </SummaryRow>

        <SearchFilterRow>
          <SearchInputWrapper>
            <Search className = "search-icon" />
            <SearchInput
              value = {searchKeyword}
              onChange = {(e) => setSearchKeyword(e.target.value)}
              placeholder = "회의 제목 또는 생성자 검색"
            />
          </SearchInputWrapper>

          <FilterSelect
            value = {statusFilter}
            onChange = {(e) =>
              setStatusFilter(e.target.value as 'all' | MeetingStatus)
            }
          >
            <option value = "all">전체 상태</option>
            <option value = "분석 완료">분석 완료</option>
            <option value = "분석중">분석중</option>
            <option value = "실패">실패</option>
          </FilterSelect>
        </SearchFilterRow>

        <DataCard>
          {filteredMeetings.length === 0 ? (
            <EmptyStateBox>
              <FileText className = "empty-icon" />
              <EmptyStateText>조건에 맞는 회의가 없습니다.</EmptyStateText>
            </EmptyStateBox>
          ) : (
            <DataTable>
              <thead>
                <tr>
                  <th>회의 제목</th>
                  <th>생성자</th>
                  <th>생성일</th>
                  <th>분석 상태</th>
                  <th>Todo 수</th>
                  <th>관리</th>
                </tr>
              </thead>

              <tbody>
                {filteredMeetings.map((meeting) => (
                  <tr key = {meeting.id}>
                    <td>{meeting.title}</td>
                    <td>{meeting.owner}</td>
                    <td>{meeting.createdAt}</td>
                    <td>
                      <TableBadge
                        $variant = {
                          meeting.status === '분석 완료'
                            ? 'success'
                            : meeting.status === '분석중'
                            ? 'pending'
                            : 'danger'
                        }
                      >
                        {meeting.status}
                      </TableBadge>
                    </td>
                    <td>{meeting.todos}</td>
                    <td>
                      <TableActionRow>
                        <TableActionButton
                          type = "button"
                          onClick = {() => openDetailModal(meeting)}
                        >
                          상세 보기
                        </TableActionButton>

                        <TableActionButton
                          type = "button"
                          onClick = {() => openStatusModal(meeting)}
                        >
                          상태 변경
                        </TableActionButton>

                        <TableActionButton
                          type = "button"
                          onClick = {() => openDeleteModal(meeting)}
                        >
                          삭제
                        </TableActionButton>
                      </TableActionRow>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          )}
        </DataCard>
      </AdminSubPageWrapper>

      {isDetailModalOpen && selectedMeeting && (
        <ModalOverlay onClick = {closeDetailModal}>
          <ModalCard onClick = {(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>회의 상세 정보</ModalTitle>
                <ModalDescription>
                  선택한 회의의 기본 정보와 분석 현황입니다
                </ModalDescription>
              </div>

              <ModalCloseButton type = "button" onClick = {closeDetailModal}>
                <X className = "close-icon" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>회의 제목</InfoLabel>
                  <InfoValue>{selectedMeeting.title}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>생성자</InfoLabel>
                  <InfoValue>{selectedMeeting.owner}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>생성일</InfoLabel>
                  <InfoValue>{selectedMeeting.createdAt}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>회의 시간</InfoLabel>
                  <InfoValue>{selectedMeeting.duration}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>참여 인원</InfoLabel>
                  <InfoValue>{selectedMeeting.participants}명</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Todo 수</InfoLabel>
                  <InfoValue>{selectedMeeting.todos}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>분석 상태</InfoLabel>
                  <InfoValue>
                    <TableBadge
                      $variant = {
                        selectedMeeting.status === '분석 완료'
                          ? 'success'
                          : selectedMeeting.status === '분석중'
                          ? 'pending'
                          : 'danger'
                      }
                    >
                      {selectedMeeting.status}
                    </TableBadge>
                  </InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>요약</InfoLabel>
                  <InfoValue>{selectedMeeting.summary}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </ModalBody>

            <ModalFooter>
              <ModalSecondaryButton type = "button" onClick = {closeDetailModal}>
                닫기
              </ModalSecondaryButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}

      {isStatusModalOpen && selectedMeeting && (
        <ModalOverlay onClick = {closeStatusModal}>
          <ModalCard onClick = {(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>회의 상태 변경</ModalTitle>
                <ModalDescription>
                  {selectedMeeting.title} 회의의 분석 상태를 변경할 수 있습니다
                </ModalDescription>
              </div>

              <ModalCloseButton type = "button" onClick = {closeStatusModal}>
                <X className = "close-icon" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <OptionList>
                <OptionButton
                  type = "button"
                  $selected = {selectedMeeting.status === '분석 완료'}
                  onClick = {() => handleChangeStatus('분석 완료')}
                >
                  <CheckCircle2 className = "option-icon" />
                  분석 완료
                </OptionButton>

                <OptionButton
                  type = "button"
                  $selected = {selectedMeeting.status === '분석중'}
                  onClick = {() => handleChangeStatus('분석중')}
                >
                  <RefreshCw className = "option-icon" />
                  분석중
                </OptionButton>

                <OptionButton
                  type = "button"
                  $selected = {selectedMeeting.status === '실패'}
                  onClick = {() => handleChangeStatus('실패')}
                >
                  <AlertTriangle className = "option-icon" />
                  실패
                </OptionButton>
              </OptionList>
            </ModalBody>

            <ModalFooter>
              <ModalSecondaryButton type = "button" onClick = {closeStatusModal}>
                취소
              </ModalSecondaryButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}

      {isDeleteModalOpen && selectedMeeting && (
        <ModalOverlay onClick = {closeDeleteModal}>
          <ModalCard onClick = {(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>회의를 삭제하시겠습니까?</ModalTitle>
                <ModalDescription>
                  삭제한 회의는 프론트 목록에서 바로 사라지며 되돌릴 수 없습니다
                </ModalDescription>
              </div>

              <ModalCloseButton type = "button" onClick = {closeDeleteModal}>
                <X className = "close-icon" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>회의 제목</InfoLabel>
                  <InfoValue>{selectedMeeting.title}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>생성자</InfoLabel>
                  <InfoValue>{selectedMeeting.owner}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>생성일</InfoLabel>
                  <InfoValue>{selectedMeeting.createdAt}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>분석 상태</InfoLabel>
                  <InfoValue>{selectedMeeting.status}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </ModalBody>

            <ModalFooter>
              <ModalSecondaryButton type = "button" onClick = {closeDeleteModal}>
                취소
              </ModalSecondaryButton>

              <ModalPrimaryButton type = "button" onClick = {handleDeleteMeeting}>
                삭제하기
              </ModalPrimaryButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
}