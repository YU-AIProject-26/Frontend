import {
  Search,
  Filter,
  Users,
  ChevronRight,
  Shield,
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

export default function AdminUsersPage() {
  const users = [
    {
      id: 1,
      nickname: '관리자',
      email: 'admin@acta.com',
      role: '관리자',
      joinedAt: '2026.05.10',
      status: '활성',
    },
    {
      id: 2,
      nickname: '테스트 사용자',
      email: 'test@acta.com',
      role: '일반',
      joinedAt: '2026.05.11',
      status: '활성',
    },
    {
      id: 3,
      nickname: '민수',
      email: 'minsuu@acta.com',
      role: '일반',
      joinedAt: '2026.05.12',
      status: '활성',
    },
    {
      id: 4,
      nickname: '지은',
      email: 'jieun@acta.com',
      role: '일반',
      joinedAt: '2026.05.12',
      status: '대기',
    },
  ];

  return (
    <AdminSubPageWrapper>
      <SubPageHeader>
        <SubPageTopRow>
          <div>
            <SubPageTitle>회원 관리</SubPageTitle>
            <SubPageDescription>
              회원 목록과 권한, 상태를 관리합니다
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
          <SearchInput placeholder = "닉네임 또는 이메일 검색" />
        </SearchInputWrapper>

        <FilterSelect defaultValue = "all">
          <option value = "all">전체 권한</option>
          <option value = "user">일반 사용자</option>
          <option value = "admin">관리자</option>
        </FilterSelect>

        <FilterSelect defaultValue = "all">
          <option value = "all">전체 상태</option>
          <option value = "active">활성</option>
          <option value = "pending">대기</option>
          <option value = "suspended">정지</option>
        </FilterSelect>
      </SearchFilterRow>

      <DataCard>
        <DataTable>
          <thead>
            <tr>
              <th>닉네임</th>
              <th>이메일</th>
              <th>권한</th>
              <th>가입일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key = {user.id}>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
                <td>
                  <TableBadge $variant = {user.role === '관리자' ? 'admin' : 'default'}>
                    {user.role}
                  </TableBadge>
                </td>
                <td>{user.joinedAt}</td>
                <td>
                  <TableBadge $variant = {user.status === '활성' ? 'success' : 'pending'}>
                    {user.status}
                  </TableBadge>
                </td>
                <td>
                  <TableActionRow>
                    <TableActionButton type = "button">상세 보기</TableActionButton>
                    <TableActionButton type = "button">권한 변경</TableActionButton>
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