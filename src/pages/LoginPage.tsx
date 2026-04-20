import { Link } from 'react-router-dom';
import {
  LoginCard,
  HeaderSection,
  Title,
  Subtitle,
  Form,
  FieldGroup,
  Label,
  FieldHeader,
  PasswordLink,
  TextInput,
  SubmitButton,
  DividerWrapper,
  DividerLine,
  DividerText,
  SocialSection,
  SocialButton,
  SocialImage,
  BottomText,
  BottomLink,
} from './LoginPage.styles';
import GoogleLogo from '../assets/google_logo.svg';
import NaverLogo from '../assets/naver_logo.svg';
import KakaoLogo from '../assets/kakao_logo.png';

export default function LoginPage() {
  return (
    <LoginCard>
      <HeaderSection>
        <Title>로그인</Title>
        <Subtitle>회의를 더 스마트하게 관리하세요</Subtitle>
      </HeaderSection>

      <Form>
        <FieldGroup>
          <Label htmlFor = "email">이메일</Label>
          <TextInput
            id = "email"
            type = "email"
            placeholder = "example@acta.com"
          />
        </FieldGroup>

        <FieldGroup>
          <FieldHeader>
            <Label htmlFor = "password">비밀번호</Label>
            <PasswordLink as = {Link} to = "/auth/reset-password">
              비밀번호 찾기
            </PasswordLink>
          </FieldHeader>

          <TextInput
            id = "password"
            type = "password"
            placeholder = "••••••••"
          />
        </FieldGroup>

        <SubmitButton type = "submit">로그인</SubmitButton>
      </Form>

      <DividerWrapper>
        <DividerLine />
        <DividerText>또는</DividerText>
      </DividerWrapper>

      <SocialSection>
        <SocialButton type = "button">
          <SocialImage src = {GoogleLogo} alt = "Google Logo" />
          Google로 로그인
        </SocialButton>

        <SocialButton type = "button">
          <SocialImage src = {NaverLogo} alt = "Naver Logo" />
          네이버로 로그인
        </SocialButton>

        <SocialButton type = "button">
          <SocialImage src = {KakaoLogo} alt = "Kakao Logo" />
          카카오로 로그인
        </SocialButton>
      </SocialSection>

      <BottomText>
        아직 계정이 없으신가요?{' '}
        <BottomLink as = {Link} to = "/auth/signup">
          회원가입
        </BottomLink>
      </BottomText>
    </LoginCard>
  );
}