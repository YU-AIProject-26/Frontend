import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Shield,
  LogOut,
  Trash2,
  Crown,
  Check,
  Smartphone,
  KeyRound,
} from 'lucide-react';
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
  PlanModalOverlay,
  PlanModalCard,
  PlanModalIconBox,
  PlanModalTitle,
  PlanModalDescription,
  PlanOptionList,
  PlanOptionCard,
  PlanOptionBadge,
  PlanOptionTop,
  PlanOptionTitle,
  PlanOptionPrice,
  PlanFeatureList,
  PlanFeatureItem,
  PlanModalButtonRow,
  PlanModalCancelButton,
  PlanModalConfirmButton,
  TwoFactorModalOverlay,
  TwoFactorModalCard,
  TwoFactorModalIconBox,
  TwoFactorModalTitle,
  TwoFactorModalDescription,
  TwoFactorInfoBox,
  TwoFactorInfoRow,
  TwoFactorInfoTextGroup,
  TwoFactorInfoTitle,
  TwoFactorInfoDescription,
  TwoFactorFeatureList,
  TwoFactorFeatureItem,
  TwoFactorButtonRow,
  TwoFactorCancelButton,
  TwoFactorConfirmButton,
} from './MyPage.styles';
import { useAuth } from '../contexts/useAuth';

export default function MyPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro'>('free');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const profile = {
    name: user?.name ?? '사용자',
    email: user?.email ?? '',
    joinDate: '2025년 12월 1일',
    plan: currentPlan === 'free' ? '무료 플랜' : 'Pro 플랜',
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

  const handleOpenPlanModal = () => {
    setSelectedPlan(currentPlan);
    setIsPlanModalOpen(true);
  };

  const handleClosePlanModal = () => {
    setIsPlanModalOpen(false);
  };

  const handleConfirmPlanChange = () => {
    setCurrentPlan(selectedPlan);
    setIsPlanModalOpen(false);
  };

  const handleOpenTwoFactorModal = () => {
    setIsTwoFactorModalOpen(true);
  };

  const handleCloseTwoFactorModal = () => {
    setIsTwoFactorModalOpen(false);
  };

  const handleConfirmTwoFactor = () => {
    setIsTwoFactorEnabled(true);
    setIsTwoFactorModalOpen(false);
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
              <PrimaryButton type = "button" onClick = {handleOpenPlanModal}>
                플랜 업그레이드
              </PrimaryButton>
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
                <HelperText>
                  {isTwoFactorEnabled
                    ? '2단계 인증이 활성화되어 있습니다.'
                    : '계정 보안을 강화하세요.'}
                </HelperText>
              </div>

              <OutlineButton type = "button" onClick = {handleOpenTwoFactorModal}>
                {isTwoFactorEnabled ? '관리하기' : '설정하기'}
              </OutlineButton>
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

      {isPlanModalOpen && (
        <PlanModalOverlay onClick = {handleClosePlanModal}>
          <PlanModalCard onClick = {(e) => e.stopPropagation()}>
            <PlanModalIconBox>
              <Crown />
            </PlanModalIconBox>

            <PlanModalTitle>플랜을 변경하시겠습니까?</PlanModalTitle>

            <PlanModalDescription>
              현재 사용 중인 플랜을 변경할 수 있습니다.
              <br />
              필요한 기능에 맞는 플랜을 선택해주세요.
            </PlanModalDescription>

            <PlanOptionList>
              <PlanOptionCard
                $selected = {selectedPlan === 'free'}
                onClick = {() => setSelectedPlan('free')}
              >
                <PlanOptionTop>
                  <div>
                    <PlanOptionTitle>무료 플랜</PlanOptionTitle>
                    <PlanOptionPrice>₩0 / 월</PlanOptionPrice>
                  </div>

                  {currentPlan === 'free' && <PlanOptionBadge>현재 플랜</PlanOptionBadge>}
                </PlanOptionTop>

                <PlanFeatureList>
                  <PlanFeatureItem>
                    <Check className = "feature-icon" />
                    기본 회의 관리
                  </PlanFeatureItem>
                  <PlanFeatureItem>
                    <Check className = "feature-icon" />
                    기본 Todo 생성
                  </PlanFeatureItem>
                  <PlanFeatureItem>
                    <Check className = "feature-icon" />
                    기본 일정 연동
                  </PlanFeatureItem>
                </PlanFeatureList>
              </PlanOptionCard>

              <PlanOptionCard
                $selected = {selectedPlan === 'pro'}
                onClick = {() => setSelectedPlan('pro')}
              >
                <PlanOptionTop>
                  <div>
                    <PlanOptionTitle>Pro 플랜</PlanOptionTitle>
                    <PlanOptionPrice>₩9,900 / 월</PlanOptionPrice>
                  </div>

                  {currentPlan === 'pro' && <PlanOptionBadge>현재 플랜</PlanOptionBadge>}
                </PlanOptionTop>

                <PlanFeatureList>
                  <PlanFeatureItem>
                    <Check className = "feature-icon" />
                    고급 AI 회의 분석
                  </PlanFeatureItem>
                  <PlanFeatureItem>
                    <Check className = "feature-icon" />
                    무제한 Todo 생성
                  </PlanFeatureItem>
                  <PlanFeatureItem>
                    <Check className = "feature-icon" />
                    외부 캘린더 확장 연동
                  </PlanFeatureItem>
                </PlanFeatureList>
              </PlanOptionCard>
            </PlanOptionList>

            <PlanModalButtonRow>
              <PlanModalCancelButton type = "button" onClick = {handleClosePlanModal}>
                취소
              </PlanModalCancelButton>

              <PlanModalConfirmButton type = "button" onClick = {handleConfirmPlanChange}>
                플랜 변경
              </PlanModalConfirmButton>
            </PlanModalButtonRow>
          </PlanModalCard>
        </PlanModalOverlay>
      )}

      {isTwoFactorModalOpen && (
        <TwoFactorModalOverlay onClick = {handleCloseTwoFactorModal}>
          <TwoFactorModalCard onClick = {(e) => e.stopPropagation()}>
            <TwoFactorModalIconBox>
              <Shield />
            </TwoFactorModalIconBox>

            <TwoFactorModalTitle>2단계 인증을 설정하시겠습니까?</TwoFactorModalTitle>

            <TwoFactorModalDescription>
              로그인 시 한 번 더 인증 단계를 거쳐 계정 보안을 강화합니다.
              <br />
              모바일 기기 또는 인증 코드를 통해 안전하게 보호할 수 있습니다.
            </TwoFactorModalDescription>

            <TwoFactorInfoBox>
              <TwoFactorInfoRow>
                <Smartphone className = "info-icon" />

                <TwoFactorInfoTextGroup>
                  <TwoFactorInfoTitle>모바일 인증 지원</TwoFactorInfoTitle>
                  <TwoFactorInfoDescription>
                    휴대폰 인증 또는 인증 앱 기반으로 확장 가능한 구조입니다.
                  </TwoFactorInfoDescription>
                </TwoFactorInfoTextGroup>
              </TwoFactorInfoRow>

              <TwoFactorInfoRow>
                <KeyRound className = "info-icon" />

                <TwoFactorInfoTextGroup>
                  <TwoFactorInfoTitle>추가 보안 코드 확인</TwoFactorInfoTitle>
                  <TwoFactorInfoDescription>
                    비밀번호 외에 한 번 더 확인 절차를 거쳐 계정을 보호합니다.
                  </TwoFactorInfoDescription>
                </TwoFactorInfoTextGroup>
              </TwoFactorInfoRow>
            </TwoFactorInfoBox>

            <TwoFactorFeatureList>
              <TwoFactorFeatureItem>
                <Check className = "feature-icon" />
                계정 도용 위험 감소
              </TwoFactorFeatureItem>
              <TwoFactorFeatureItem>
                <Check className = "feature-icon" />
                중요 정보 접근 보안 강화
              </TwoFactorFeatureItem>
              <TwoFactorFeatureItem>
                <Check className = "feature-icon" />
                추후 인증 방식 확장 가능
              </TwoFactorFeatureItem>
            </TwoFactorFeatureList>

            <TwoFactorButtonRow>
              <TwoFactorCancelButton type = "button" onClick = {handleCloseTwoFactorModal}>
                취소
              </TwoFactorCancelButton>

              <TwoFactorConfirmButton type = "button" onClick = {handleConfirmTwoFactor}>
                {isTwoFactorEnabled ? '유지하기' : '활성화하기'}
              </TwoFactorConfirmButton>
            </TwoFactorButtonRow>
          </TwoFactorModalCard>
        </TwoFactorModalOverlay>
      )}
    </>
  );
}