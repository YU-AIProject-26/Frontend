import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import GoogleLogo from '../assets/google_logo.svg';
import NaverLogo from '../assets/naver_logo.svg';
import KakaoLogo from '../assets/kakao_logo.png';
import LegalModal from '../components/LegalModal';
import {
  TERMS_DOCUMENT,
  PRIVACY_DOCUMENT,
  type LegalDocument,
} from '../utils/legalContent';
import {
  SignupCard,
  HeaderSection,
  Title,
  Subtitle,
  Form,
  FieldGroup,
  Label,
  TextInput,
  InlineRow,
  InlineInputWrap,
  InlineActionButton,
  HelperText,
  TimerText,
  TermsRow,
  TermsCheckbox,
  TermsLabel,
  TermsLinkButton,
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

const MOCK_TAKEN_EMAILS = ['admin@acta.com', 'test@acta.com', 'user@acta.com'];
const MOCK_VERIFICATION_CODE = '123456';
const VERIFICATION_LIMIT_SECONDS = 180;

export default function SignupPage() {
  const [openDocument, setOpenDocument] = useState<LegalDocument | null>(null);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (!isVerificationSent || remainingSeconds <= 0 || isEmailVerified) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIsVerificationSent(false);
          setVerificationMessage('이메일 인증 시간이 만료되었습니다. 다시 요청해주세요.');
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isVerificationSent, remainingSeconds, isEmailVerified]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes}:${`${seconds}`.padStart(2, '0')}`;
  }, [remainingSeconds]);

  const isPasswordMatched =
    password.trim().length > 0 &&
    passwordConfirm.trim().length > 0 &&
    password === passwordConfirm;

  const isSignupEnabled =
    nickname.trim().length > 0 &&
    email.trim().length > 0 &&
    isEmailChecked &&
    isEmailAvailable === true &&
    isEmailVerified &&
    password.trim().length > 0 &&
    passwordConfirm.trim().length > 0 &&
    isPasswordMatched &&
    agreedToTerms;

  const resetEmailVerificationState = () => {
    setIsEmailChecked(false);
    setIsEmailAvailable(null);
    setEmailCheckMessage('');
    setVerificationCode('');
    setIsVerificationSent(false);
    setIsEmailVerified(false);
    setVerificationMessage('');
    setRemainingSeconds(0);
  };

  const handleEmailDuplicateCheck = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setIsEmailChecked(false);
      setIsEmailAvailable(null);
      setEmailCheckMessage('이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setIsEmailChecked(false);
      setIsEmailAvailable(null);
      setEmailCheckMessage('올바른 이메일 형식으로 입력해주세요.');
      return;
    }

    const duplicated = MOCK_TAKEN_EMAILS.includes(normalizedEmail);

    setIsEmailChecked(true);
    setIsEmailAvailable(!duplicated);

    if (duplicated) {
      setEmailCheckMessage('이미 사용 중인 이메일입니다.');
      setIsVerificationSent(false);
      setIsEmailVerified(false);
      setVerificationMessage('');
      setRemainingSeconds(0);
      return;
    }

    setEmailCheckMessage('사용 가능한 이메일입니다.');
  };

  const handleSendVerificationEmail = () => {
    if (!isEmailChecked || isEmailAvailable !== true) {
      setVerificationMessage('이메일 중복 확인을 먼저 진행해주세요.');
      return;
    }

    setIsVerificationSent(true);
    setIsEmailVerified(false);
    setVerificationCode('');
    setVerificationMessage('인증번호를 전송했습니다. 예시 인증번호는 123456입니다.');
    setRemainingSeconds(VERIFICATION_LIMIT_SECONDS);
  };

  const handleVerifyCode = () => {
    if (!isVerificationSent || remainingSeconds <= 0) {
      setVerificationMessage('인증 시간이 만료되었습니다. 다시 요청해주세요.');
      return;
    }

    if (!verificationCode.trim()) {
      setVerificationMessage('인증번호를 입력해주세요.');
      return;
    }

    if (verificationCode.trim() !== MOCK_VERIFICATION_CODE) {
      setIsEmailVerified(false);
      setVerificationMessage('인증번호가 올바르지 않습니다.');
      return;
    }

    setIsEmailVerified(true);
    setIsVerificationSent(false);
    setRemainingSeconds(0);
    setVerificationMessage('이메일 인증이 완료되었습니다.');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignupEnabled) {
      return;
    }

    console.log('회원가입 시도', {
      nickname,
      email,
      password,
      passwordConfirm,
      agreedToTerms,
      isEmailChecked,
      isEmailAvailable,
      isEmailVerified,
    });
  };

  return (
    <>
      <SignupCard>
        <HeaderSection>
          <Title>회원가입</Title>
          <Subtitle>무료로 시작하고 회의를 스마트하게 관리하세요</Subtitle>
        </HeaderSection>

        <Form onSubmit = {handleSubmit}>
          <FieldGroup>
            <Label htmlFor = "name">닉네임</Label>
            <TextInput
              id = "name"
              type = "text"
              placeholder = "홍길동"
              value = {nickname}
              onChange = {(e) => setNickname(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor = "email">이메일</Label>

            <InlineRow>
              <InlineInputWrap>
                <TextInput
                  id = "email"
                  type = "email"
                  placeholder = "example@acta.com"
                  value = {email}
                  onChange = {(e) => {
                    setEmail(e.target.value);
                    resetEmailVerificationState();
                  }}
                />
              </InlineInputWrap>

              <InlineActionButton
                type = "button"
                onClick = {handleEmailDuplicateCheck}
              >
                중복 확인
              </InlineActionButton>
            </InlineRow>

            {emailCheckMessage && (
              <HelperText $state = {isEmailAvailable ? 'success' : 'error'}>
                {emailCheckMessage}
              </HelperText>
            )}

            <InlineRow>
              <InlineInputWrap>
                <TextInput
                  id = "email-verification"
                  type = "text"
                  placeholder = "인증번호를 입력해주세요"
                  value = {verificationCode}
                  onChange = {(e) => setVerificationCode(e.target.value)}
                  disabled = {!isVerificationSent && !isEmailVerified}
                />
              </InlineInputWrap>

              {!isVerificationSent && !isEmailVerified ? (
                <InlineActionButton
                  type = "button"
                  onClick = {handleSendVerificationEmail}
                >
                  인증 요청
                </InlineActionButton>
              ) : (
                <InlineActionButton
                  type = "button"
                  onClick = {handleVerifyCode}
                  disabled = {isEmailVerified}
                >
                  인증 확인
                </InlineActionButton>
              )}
            </InlineRow>

            {isVerificationSent && !isEmailVerified && (
              <TimerText>남은 인증 시간 {formattedTime}</TimerText>
            )}

            {verificationMessage && (
              <HelperText $state = {isEmailVerified ? 'success' : 'default'}>
                {verificationMessage}
              </HelperText>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor = "password">비밀번호</Label>
            <TextInput
              id = "password"
              type = "password"
              placeholder = "8자 이상 입력해주세요"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor = "password-confirm">비밀번호 확인</Label>
            <TextInput
              id = "password-confirm"
              type = "password"
              placeholder = "비밀번호를 다시 입력해주세요"
              value = {passwordConfirm}
              onChange = {(e) => setPasswordConfirm(e.target.value)}
            />
          </FieldGroup>

          <TermsRow htmlFor = "terms">
            <TermsCheckbox
              id = "terms"
              type = "checkbox"
              checked = {agreedToTerms}
              onChange = {(e) => setAgreedToTerms(e.target.checked)}
            />
            <TermsLabel>
              <TermsLinkButton
                type = "button"
                onClick = {(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenDocument(TERMS_DOCUMENT);
                }}
              >
                이용약관
              </TermsLinkButton>{' '}
              및{' '}
              <TermsLinkButton
                type = "button"
                onClick = {(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenDocument(PRIVACY_DOCUMENT);
                }}
              >
                개인정보처리방침
              </TermsLinkButton>
              에 동의합니다
            </TermsLabel>
          </TermsRow>

          <SubmitButton type = "submit" disabled = {!isSignupEnabled}>
            회원가입
          </SubmitButton>
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

      <LegalModal
        open = {openDocument !== null}
        document = {openDocument}
        onClose = {() => setOpenDocument(null)}
      />
    </>
  );
}