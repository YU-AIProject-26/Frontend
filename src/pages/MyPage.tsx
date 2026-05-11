import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Shield, LogOut, Trash2 } from 'lucide-react';
import {
  PageWrapper,
  HeaderSection,
  Title,
  Subtitle,
  Card,
  ProfileSection,
  ProfileAvatar,
  ProfileContent,
  ProfileTop,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  OutlineButton,
  StatsRow,
  StatItem,
  StatValue,
  StatLabel,
  SectionHeader,
  SectionTitle,
  SectionIcon,
  FormGroup,
  Label,
  Input,
  HelperText,
  InfoText,
  PlanRow,
  PrimaryButton,
  Separator,
  ActionStack,
  DangerButton,
  DeleteModalOverlay,
  DeleteModalCard,
  DeleteModalIconBox,
  DeleteModalTitle,
  DeleteModalDescription,
  DeleteModalButtonRow,
  DeleteModalCancelButton,
  DeleteModalConfirmButton,
} from './MyPage.styles';
import { useAuth } from '../contexts/useAuth';

export default function MyPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const profile = {
    name: user?.name ?? '사용자',
    email: user?.email ?? '',
    joinDate: '2025년 12월 1일',
    plan: '무료 플랜',
    meetings: 24,
    todos: 47,
    hours: 32,
  };

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteAccount = () => {
    setIsDeleteModalOpen(false);
    logout();
    navigate('/landing');
  };

  return (
    <>
      <PageWrapper>
        <HeaderSection>
          <Title>내 정보</Title>
          <Subtitle>프로필과 계정 설정을 관리하세요</Subtitle>
        </HeaderSection>

        <Card>
          <ProfileSection>
            <ProfileAvatar>
              <span>{profile.name[0]}</span>
            </ProfileAvatar>

            <ProfileContent>
              <ProfileTop>
                <ProfileInfo>
                  <ProfileName>{profile.name}</ProfileName>
                  <ProfileEmail>{profile.email}</ProfileEmail>
                </ProfileInfo>

                <OutlineButton type = "button">
                  <User className = "button-icon" />
                  프로필 수정
                </OutlineButton>
              </ProfileTop>

              <StatsRow>
                <StatItem>
                  <StatValue>{profile.meetings}</StatValue>
                  <StatLabel>회의</StatLabel>
                </StatItem>

                <StatItem>
                  <StatValue>{profile.todos}</StatValue>
                  <StatLabel>Todo</StatLabel>
                </StatItem>

                <StatItem>
                  <StatValue>{profile.hours}h</StatValue>
                  <StatLabel>회의 시간</StatLabel>
                </StatItem>
              </StatsRow>
            </ProfileContent>
          </ProfileSection>
        </Card>

        <Card>
          <SectionHeader>
            <SectionIcon>
              <Mail />
            </SectionIcon>
            <SectionTitle>계정 정보</SectionTitle>
          </SectionHeader>

          <FormGroup>
            <Label htmlFor = "name">이름</Label>
            <Input id = "name" defaultValue = {profile.name} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor = "email">이메일</Label>
            <Input id = "email" type = "email" defaultValue = {profile.email} disabled />
            <HelperText>이메일은 변경할 수 없습니다.</HelperText>
          </FormGroup>

          <FormGroup>
            <Label>가입일</Label>
            <InfoText>{profile.joinDate}</InfoText>
          </FormGroup>

          <FormGroup>
            <Label>플랜</Label>
            <PlanRow>
              <InfoText>{profile.plan}</InfoText>
              <PrimaryButton type = "button">플랜 업그레이드</PrimaryButton>
            </PlanRow>
          </FormGroup>

          <Separator />

          <PrimaryButton type = "button" $fullWidth>
            변경사항 저장
          </PrimaryButton>
        </Card>

        <Card>
          <SectionHeader>
            <SectionIcon>
              <Shield />
            </SectionIcon>
            <SectionTitle>보안</SectionTitle>
          </SectionHeader>

          <ActionStack>
            <PlanRow>
              <div>
                <Label as = "p">비밀번호</Label>
                <HelperText>마지막 변경: 2026년 3월 1일</HelperText>
              </div>

              <Link to = "/auth/reset-password">
                <OutlineButton type = "button">비밀번호 변경</OutlineButton>
              </Link>
            </PlanRow>

            <Separator />

            <PlanRow>
              <div>
                <Label as = "p">2단계 인증</Label>
                <HelperText>계정 보안을 강화하세요.</HelperText>
              </div>

              <OutlineButton type = "button">설정하기</OutlineButton>
            </PlanRow>
          </ActionStack>
        </Card>

        <Card>
          <SectionHeader>
            <SectionTitle>계정 관리</SectionTitle>
          </SectionHeader>

          <ActionStack>
            <OutlineButton type = "button" $fullWidth $justifyStart onClick = {handleLogout}>
              <LogOut className = "button-icon" />
              로그아웃
            </OutlineButton>

            <DangerButton type = "button" onClick = {handleOpenDeleteModal}>
              <Trash2 className = "button-icon" />
              계정 탈퇴
            </DangerButton>

            <HelperText>
              계정을 탈퇴하면 모든 데이터가 삭제되며 복구할 수 없습니다.
            </HelperText>
          </ActionStack>
        </Card>
      </PageWrapper>

      {isDeleteModalOpen && (
        <DeleteModalOverlay onClick = {handleCloseDeleteModal}>
          <DeleteModalCard onClick = {(e) => e.stopPropagation()}>
            <DeleteModalIconBox>
              <Trash2 />
            </DeleteModalIconBox>

            <DeleteModalTitle>정말 계정을 탈퇴하시겠습니까?</DeleteModalTitle>

            <DeleteModalDescription>
              계정을 탈퇴하면 모든 데이터가 삭제되며 복구할 수 없습니다.
              <br />
              한 번 더 확인한 뒤 진행해주세요.
            </DeleteModalDescription>

            <DeleteModalButtonRow>
              <DeleteModalCancelButton type = "button" onClick = {handleCloseDeleteModal}>
                취소
              </DeleteModalCancelButton>

              <DeleteModalConfirmButton
                type = "button"
                onClick = {handleConfirmDeleteAccount}
              >
                탈퇴하기
              </DeleteModalConfirmButton>
            </DeleteModalButtonRow>
          </DeleteModalCard>
        </DeleteModalOverlay>
      )}
    </>
  );
}