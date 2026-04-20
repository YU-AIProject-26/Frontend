import { Link } from 'react-router-dom';
import GoogleLogo from '../assets/google_logo.svg';
import NaverLogo from '../assets/naver_logo.svg';
import KakaoLogo from '../assets/kakao_logo.png';
import {
  SignupCard,
  HeaderSection,
  Title,
  Subtitle,
  Form,
  FieldGroup,
  Label,
  TextInput,
  TermsRow,
  TermsCheckbox,
  TermsLabel,
  TermsLink,
  SubmitButton,
  DividerWrapper,
  DividerLine,
  DividerText,
  SocialSection,
  SocialButton,
  SocialImage,
  BottomText,
  BottomLink,
} from './SignupPage.styles';

export default function SignupPage() {
  return (
    <SignupCard>
      <HeaderSection>
        <Title>회원가입</Title>
        <Subtitle>무료로 시작하고 회의를 스마트하게 관리하세요</Subtitle>
      </HeaderSection>

      <Form>
        <FieldGroup>
          <Label htmlFor = "name">닉네임</Label>
          <TextInput id = "name" type = "text" placeholder = "홍길동" />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor = "email">이메일</Label>
          <TextInput id = "email" type = "email" placeholder = "example@acta.com" />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor = "password">비밀번호</Label>
          <TextInput
            id = "password"
            type = "password"
            placeholder = "8자 이상 입력해주세요"
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor = "password-confirm">비밀번호 확인</Label>
          <TextInput
            id = "password-confirm"
            type = "password"
            placeholder = "비밀번호를 다시 입력해주세요"
          />
        </FieldGroup>

        <TermsRow htmlFor = "terms">
          <TermsCheckbox id = "terms" type = "checkbox" />
          <TermsLabel>
            <TermsLink as = {Link} to = "/terms">
              이용약관
            </TermsLink>{' '}
            및{' '}
            <TermsLink as = {Link} to = "/privacy">
              개인정보처리방침
            </TermsLink>
            에 동의합니다
          </TermsLabel>
        </TermsRow>

        <SubmitButton type = "submit">회원가입</SubmitButton>
      </Form>

      <DividerWrapper>
        <DividerLine />
        <DividerText>또는</DividerText>
      </DividerWrapper>

      <SocialSection>
        <SocialButton type = "button">
          <SocialImage src = {GoogleLogo} alt = "Google" />
          Google로 가입하기
        </SocialButton>

        <SocialButton type = "button">
          <SocialImage src = {NaverLogo} alt = "네이버" />
          네이버로 가입하기
        </SocialButton>

        <SocialButton type = "button">
          <SocialImage src = {KakaoLogo} alt = "카카오" />
          카카오로 가입하기
        </SocialButton>
      </SocialSection>

      <BottomText>
        이미 계정이 있으신가요?{' '}
        <BottomLink as = {Link} to = "/auth/login">
          로그인
        </BottomLink>
      </BottomText>
    </SignupCard>
  );
}