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

export default function AdminInquiriesPage() {
  const inquiries = [
    {
      id: 1,
      type: '문의',
      title: 'Google Calendar 연동이 되지 않습니다',
      author: 'jihye@acta.com',
      status: '대기',
      createdAt: '2026.05.12 14:20',
    },
    {
      id: 2,
      type: '신고',
      title: '회의 제목에 부적절한 내용이 포함되어 있습니다',
      author: 'report@acta.com',
      status: '처리중',
      createdAt: '2026.05.12 12:05',
    },
    {
      id: 3,
      type: '피드백',
      title: '회의 분석 결과 다운로드 기능이 있으면 좋겠습니다',
      author: 'sora@acta.com',
      status: '완료',
      createdAt: '2026.05.11 18:42',
    },
  ];

  return (
    <AdminSubPageWrapper>
      <SubPageHeader>
        <SubPageTopRow>
          <div>
            <SubPageTitle>문의 / 신고 관리</SubPageTitle>
            <SubPageDescription>
              접수된 문의, 신고, 피드백을 확인하고 처리합니다
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
          <SearchInput placeholder = "제목 또는 작성자 검색" />
        </SearchInputWrapper>

        <FilterSelect defaultValue = "all">
          <option value = "all">전체 유형</option>
          <option value = "inquiry">문의</option>
          <option value = "report">신고</option>
          <option value = "feedback">피드백</option>
        </FilterSelect>

        <FilterSelect defaultValue = "all">
          <option value = "all">전체 상태</option>
          <option value = "pending">대기</option>
          <option value = "processing">처리중</option>
          <option value = "done">완료</option>
        </FilterSelect>
      </SearchFilterRow>

      <DataCard>
        <DataTable>
          <thead>
            <tr>
              <th>유형</th>
              <th>제목</th>
              <th>작성자</th>
              <th>상태</th>
              <th>접수일</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((item) => (
              <tr key = {item.id}>
                <td>
                  <TableBadge
                    $variant = {
                      item.type === '문의'
                        ? 'default'
                        : item.type === '신고'
                        ? 'danger'
                        : 'success'
                    }
                  >
                    {item.type}
                  </TableBadge>
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <TableBadge
                    $variant = {
                      item.status === '대기'
                        ? 'pending'
                        : item.status === '처리중'
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {item.status}
                  </TableBadge>
                </td>
                <td>{item.createdAt}</td>
                <td>
                  <TableActionRow>
                    <TableActionButton type = "button">상세 보기</TableActionButton>
                    <TableActionButton type = "button">상태 변경</TableActionButton>
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