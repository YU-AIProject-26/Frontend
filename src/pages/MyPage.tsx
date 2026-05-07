import { Link } from 'react-router-dom';
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
  FullWidthLink,
} from './MyPage.styles';

export default function MyPage() {
  const user = {
    name: '홍길동',
    email: 'hong@acta.com',
    joinDate: '2025년 12월 1일',
    plan: '무료 플랜',
    meetings: 24,
    todos: 47,
    hours: 32,
  };

  return (
    <PageWrapper>
      <HeaderSection>
        <Title>내 정보</Title>
        <Subtitle>프로필과 계정 설정을 관리하세요</Subtitle>
      </HeaderSection>

      <Card>
        <ProfileSection>
          <ProfileAvatar>
            <span>{user.name[0]}</span>
          </ProfileAvatar>

          <ProfileContent>
            <ProfileTop>
              <ProfileInfo>
                <ProfileName>{user.name}</ProfileName>
                <ProfileEmail>{user.email}</ProfileEmail>
              </ProfileInfo>

              <OutlineButton type = "button">
                <User className = "button-icon" />
                프로필 수정
              </OutlineButton>
            </ProfileTop>

            <StatsRow>
              <StatItem>
                <StatValue>{user.meetings}</StatValue>
                <StatLabel>회의</StatLabel>
              </StatItem>

              <StatItem>
                <StatValue>{user.todos}</StatValue>
                <StatLabel>Todo</StatLabel>
              </StatItem>

              <StatItem>
                <StatValue>{user.hours}h</StatValue>
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
          <Input id = "name" defaultValue = {user.name} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor = "email">이메일</Label>
          <Input id = "email" type = "email" defaultValue = {user.email} disabled />
          <HelperText>이메일은 변경할 수 없습니다.</HelperText>
        </FormGroup>

        <FormGroup>
          <Label>가입일</Label>
          <InfoText>{user.joinDate}</InfoText>
        </FormGroup>

        <FormGroup>
          <Label>플랜</Label>
          <PlanRow>
            <InfoText>{user.plan}</InfoText>
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
          <FullWidthLink to = "/landing">
            <OutlineButton type = "button" $fullWidth $justifyStart>
              <LogOut className = "button-icon" />
              로그아웃
            </OutlineButton>
          </FullWidthLink>

          <DangerButton type = "button">
            <Trash2 className = "button-icon" />
            계정 탈퇴
          </DangerButton>

          <HelperText>
            계정을 탈퇴하면 모든 데이터가 삭제되며 복구할 수 없습니다.
          </HelperText>
        </ActionStack>
      </Card>
    </PageWrapper>
  );
}