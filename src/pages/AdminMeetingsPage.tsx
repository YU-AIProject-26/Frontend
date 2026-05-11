import {
  Search,
  ChevronRight,
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
} from './AdminSubPage.styles';

export default function AdminMeetingsPage() {
  const meetings = [
    {
      id: 1,
      title: '주간 마케팅 전략 회의',
      owner: '관리자',
      createdAt: '2026.05.12 09:40',
      status: '분석 완료',
      todos: 6,
    },
    {
      id: 2,
      title: '제품 로드맵 리뷰',
      owner: '테스트 사용자',
      createdAt: '2026.05.12 08:20',
      status: '분석중',
      todos: 3,
    },
    {
      id: 3,
      title: '고객 피드백 세션',
      owner: '민수',
      createdAt: '2026.05.11 16:00',
      status: '분석 완료',
      todos: 4,
    },
    {
      id: 4,
      title: '실험용 실패 회의',
      owner: '지은',
      createdAt: '2026.05.11 11:10',
      status: '실패',
      todos: 0,
    },
  ];

  return (
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

      <SearchFilterRow>
        <SearchInputWrapper>
          <Search className = "search-icon" />
          <SearchInput placeholder = "회의 제목 또는 생성자 검색" />
        </SearchInputWrapper>

        <FilterSelect defaultValue = "all">
          <option value = "all">전체 상태</option>
          <option value = "completed">분석 완료</option>
          <option value = "analyzing">분석중</option>
          <option value = "failed">실패</option>
        </FilterSelect>
      </SearchFilterRow>

      <DataCard>
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
            {meetings.map((meeting) => (
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
                    <TableActionButton type = "button">상세 보기</TableActionButton>
                    <TableActionButton type = "button">상태 변경</TableActionButton>
                    <TableActionButton type = "button">삭제</TableActionButton>
                  </TableActionRow>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </DataCard>
    </AdminSubPageWrapper>
  );
}