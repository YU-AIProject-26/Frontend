import { useMemo, useState } from 'react';
import {
  Search,
  ChevronRight,
  Shield,
  UserX,
  CheckCircle2,
  Users,
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
  RoleOptionList,
  RoleOptionButton,
  EmptyStateBox,
  EmptyStateText,
} from './AdminSubPage.styles';

type UserRole = 'admin' | 'user';
type UserStatus = '활성' | '대기' | '정지';

type UserItem = {
  id: number;
  nickname: string;
  email: string;
  role: UserRole;
  joinedAt: string;
  status: UserStatus;
  meetings: number;
  todos: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 1,
      nickname: '관리자',
      email: 'admin@acta.com',
      role: 'admin',
      joinedAt: '2026.05.10',
      status: '활성',
      meetings: 18,
      todos: 47,
    },
    {
      id: 2,
      nickname: '테스트 사용자',
      email: 'test@acta.com',
      role: 'user',
      joinedAt: '2026.05.11',
      status: '활성',
      meetings: 9,
      todos: 16,
    },
    {
      id: 3,
      nickname: '민수',
      email: 'minsuu@acta.com',
      role: 'user',
      joinedAt: '2026.05.12',
      status: '활성',
      meetings: 12,
      todos: 22,
    },
    {
      id: 4,
      nickname: '지은',
      email: 'jieun@acta.com',
      role: 'user',
      joinedAt: '2026.05.12',
      status: '대기',
      meetings: 3,
      todos: 7,
    },
    {
      id: 5,
      nickname: '하린',
      email: 'harin@acta.com',
      role: 'user',
      joinedAt: '2026.05.13',
      status: '정지',
      meetings: 1,
      todos: 2,
    },
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');

  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesKeyword =
        user.nickname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.email.toLowerCase().includes(searchKeyword.toLowerCase());

      const matchesRole = roleFilter === 'all' ? true : user.role === roleFilter;
      const matchesStatus =
        statusFilter === 'all' ? true : user.status === statusFilter;

      return matchesKeyword && matchesRole && matchesStatus;
    });
  }, [users, searchKeyword, roleFilter, statusFilter]);

  const openDetailModal = (user: UserItem) => {
    setSelectedUser(user);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedUser(null);
  };

  const openRoleModal = (user: UserItem) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
    setSelectedUser(null);
  };

  const openStatusModal = (user: UserItem) => {
    setSelectedUser(user);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedUser(null);
  };

  const handleChangeRole = (nextRole: UserRole) => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? { ...user, role: nextRole }
          : user
      )
    );

    closeRoleModal();
  };

  const handleChangeStatus = (nextStatus: UserStatus) => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? { ...user, status: nextStatus }
          : user
      )
    );

    closeStatusModal();
  };

  return (
    <>
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
            <SearchInput
              value = {searchKeyword}
              onChange = {(e) => setSearchKeyword(e.target.value)}
              placeholder = "닉네임 또는 이메일 검색"
            />
          </SearchInputWrapper>

          <FilterSelect
            value = {roleFilter}
            onChange = {(e) => setRoleFilter(e.target.value as 'all' | UserRole)}
          >
            <option value = "all">전체 권한</option>
            <option value = "user">일반 사용자</option>
            <option value = "admin">관리자</option>
          </FilterSelect>

          <FilterSelect
            value = {statusFilter}
            onChange = {(e) =>
              setStatusFilter(e.target.value as 'all' | UserStatus)
            }
          >
            <option value = "all">전체 상태</option>
            <option value = "활성">활성</option>
            <option value = "대기">대기</option>
            <option value = "정지">정지</option>
          </FilterSelect>
        </SearchFilterRow>

        <DataCard>
          {filteredUsers.length === 0 ? (
            <EmptyStateBox>
              <Users className = "empty-icon" />
              <EmptyStateText>조건에 맞는 회원이 없습니다.</EmptyStateText>
            </EmptyStateBox>
          ) : (
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
                {filteredUsers.map((user) => (
                  <tr key = {user.id}>
                    <td>{user.nickname}</td>
                    <td>{user.email}</td>
                    <td>
                      <TableBadge $variant = {user.role === 'admin' ? 'admin' : 'default'}>
                        {user.role === 'admin' ? '관리자' : '일반'}
                      </TableBadge>
                    </td>
                    <td>{user.joinedAt}</td>
                    <td>
                      <TableBadge
                        $variant = {
                          user.status === '활성'
                            ? 'success'
                            : user.status === '대기'
                            ? 'pending'
                            : 'danger'
                        }
                      >
                        {user.status}
                      </TableBadge>
                    </td>
                    <td>
                      <TableActionRow>
                        <TableActionButton
                          type = "button"
                          onClick = {() => openDetailModal(user)}
                        >
                          상세 보기
                        </TableActionButton>

                        <TableActionButton
                          type = "button"
                          onClick = {() => openRoleModal(user)}
                        >
                          권한 변경
                        </TableActionButton>

                        <TableActionButton
                          type = "button"
                          onClick = {() => openStatusModal(user)}
                        >
                          상태 변경
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

      {isDetailModalOpen && selectedUser && (
        <ModalOverlay onClick = {closeDetailModal}>
          <ModalCard onClick = {(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>회원 상세 정보</ModalTitle>
                <ModalDescription>
                  선택한 회원의 계정 정보와 활동 현황입니다
                </ModalDescription>
              </div>

              <ModalCloseButton type = "button" onClick = {closeDetailModal}>
                <X className = "close-icon" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>닉네임</InfoLabel>
                  <InfoValue>{selectedUser.nickname}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>이메일</InfoLabel>
                  <InfoValue>{selectedUser.email}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>권한</InfoLabel>
                  <InfoValue>
                    <TableBadge
                      $variant = {
                        selectedUser.role === 'admin' ? 'admin' : 'default'
                      }
                    >
                      {selectedUser.role === 'admin' ? '관리자' : '일반'}
                    </TableBadge>
                  </InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>상태</InfoLabel>
                  <InfoValue>
                    <TableBadge
                      $variant = {
                        selectedUser.status === '활성'
                          ? 'success'
                          : selectedUser.status === '대기'
                          ? 'pending'
                          : 'danger'
                      }
                    >
                      {selectedUser.status}
                    </TableBadge>
                  </InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>가입일</InfoLabel>
                  <InfoValue>{selectedUser.joinedAt}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>생성 회의 수</InfoLabel>
                  <InfoValue>{selectedUser.meetings}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Todo 수</InfoLabel>
                  <InfoValue>{selectedUser.todos}</InfoValue>
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

      {isRoleModalOpen && selectedUser && (
        <ModalOverlay onClick = {closeRoleModal}>
          <ModalCard onClick = {(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>회원 권한 변경</ModalTitle>
                <ModalDescription>
                  {selectedUser.nickname} 계정의 권한을 변경할 수 있습니다
                </ModalDescription>
              </div>

              <ModalCloseButton type = "button" onClick = {closeRoleModal}>
                <X className = "close-icon" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <RoleOptionList>
                <RoleOptionButton
                  type = "button"
                  $selected = {selectedUser.role === 'user'}
                  onClick = {() => handleChangeRole('user')}
                >
                  <Users className = "role-icon" />
                  일반 사용자
                </RoleOptionButton>

                <RoleOptionButton
                  type = "button"
                  $selected = {selectedUser.role === 'admin'}
                  onClick = {() => handleChangeRole('admin')}
                >
                  <Shield className = "role-icon" />
                  관리자
                </RoleOptionButton>
              </RoleOptionList>
            </ModalBody>

            <ModalFooter>
              <ModalSecondaryButton type = "button" onClick = {closeRoleModal}>
                취소
              </ModalSecondaryButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}

      {isStatusModalOpen && selectedUser && (
        <ModalOverlay onClick = {closeStatusModal}>
          <ModalCard onClick = {(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>회원 상태 변경</ModalTitle>
                <ModalDescription>
                  {selectedUser.nickname} 계정의 상태를 변경할 수 있습니다
                </ModalDescription>
              </div>

              <ModalCloseButton type = "button" onClick = {closeStatusModal}>
                <X className = "close-icon" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <RoleOptionList>
                <RoleOptionButton
                  type = "button"
                  $selected = {selectedUser.status === '활성'}
                  onClick = {() => handleChangeStatus('활성')}
                >
                  <CheckCircle2 className = "role-icon" />
                  활성
                </RoleOptionButton>

                <RoleOptionButton
                  type = "button"
                  $selected = {selectedUser.status === '대기'}
                  onClick = {() => handleChangeStatus('대기')}
                >
                  <Shield className = "role-icon" />
                  대기
                </RoleOptionButton>

                <RoleOptionButton
                  type = "button"
                  $selected = {selectedUser.status === '정지'}
                  onClick = {() => handleChangeStatus('정지')}
                >
                  <UserX className = "role-icon" />
                  정지
                </RoleOptionButton>
              </RoleOptionList>
            </ModalBody>

            <ModalFooter>
              <ModalSecondaryButton type = "button" onClick = {closeStatusModal}>
                취소
              </ModalSecondaryButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
}