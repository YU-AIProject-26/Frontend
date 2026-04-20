import { Link } from 'react-router-dom';
import {
  ResetCard,
  HeaderSection,
  Title,
  Subtitle,
  Form,
  FieldGroup,
  Label,
  TextInput,
  OutlineButton,
  CodeRow,
  CodeInputWrapper,
  CodeCheckButton,
  SubmitButton,
  BottomSection,
  BottomLink,
} from './PasswordResetPage.styles';

export default function PasswordResetPage() {
  return (
    <ResetCard>
      <HeaderSection>
        <Title>비밀번호 재설정</Title>
        <Subtitle>이메일 주소를 입력하시면 인증코드를 보내드립니다</Subtitle>
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

        <OutlineButton type = "button">인증코드 받기</OutlineButton>

        <FieldGroup>
          <Label htmlFor = "code">인증코드</Label>
          <CodeRow>
            <CodeInputWrapper>
              <TextInput
                id = "code"
                type = "text"
                placeholder = "6자리 코드 입력"
              />
            </CodeInputWrapper>
            <CodeCheckButton type = "button">확인</CodeCheckButton>
          </CodeRow>
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor = "new-password">새 비밀번호</Label>
          <TextInput
            id = "new-password"
            type = "password"
            placeholder = "8자 이상 입력해주세요"
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor = "new-password-confirm">새 비밀번호 확인</Label>
          <TextInput
            id = "new-password-confirm"
            type = "password"
            placeholder = "비밀번호를 다시 입력해주세요"
          />
        </FieldGroup>

        <SubmitButton type = "submit">비밀번호 변경</SubmitButton>
      </Form>

      <BottomSection>
        <BottomLink as = {Link} to = "/auth/login">
          로그인으로 돌아가기
        </BottomLink>
      </BottomSection>
    </ResetCard>
  );
}