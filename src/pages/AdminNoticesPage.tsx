import { ChevronRight } from 'lucide-react';
import {
  AdminSubPageWrapper,
  SubPageHeader,
  SubPageTitle,
  SubPageDescription,
  SubPageTopRow,
  SubPagePrimaryLink,
  FormCard,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormButtonRow,
  FormPrimaryButton,
  FormSecondaryButton,
  NoticeListCard,
  NoticeListTitle,
  NoticeItem,
  NoticeItemTitle,
  NoticeItemMeta,
  TableActionRow,
  TableActionButton,
} from './AdminSubPage.styles';

export default function AdminNoticesPage() {
  const notices = [
    {
      id: 1,
      title: '서비스 점검 안내',
      createdAt: '2026.05.12',
      status: '게시중',
    },
    {
      id: 2,
      title: '신규 기능 업데이트 예정',
      createdAt: '2026.05.11',
      status: '임시저장',
    },
  ];

  return (
    <AdminSubPageWrapper>
      <SubPageHeader>
        <SubPageTopRow>
          <div>
            <SubPageTitle>공지사항 관리</SubPageTitle>
            <SubPageDescription>
              공지사항을 등록하고 수정, 삭제할 수 있습니다
            </SubPageDescription>
          </div>

          <SubPagePrimaryLink to = "/admin">
            관리자 메인으로
            <ChevronRight className = "link-arrow" />
          </SubPagePrimaryLink>
        </SubPageTopRow>
      </SubPageHeader>

      <FormCard>
        <FormGroup>
          <FormLabel htmlFor = "notice-title">공지 제목</FormLabel>
          <FormInput id = "notice-title" placeholder = "공지 제목을 입력하세요" />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor = "notice-content">공지 내용</FormLabel>
          <FormTextArea
            id = "notice-content"
            placeholder = "공지 내용을 입력하세요"
          />
        </FormGroup>

        <FormButtonRow>
          <FormSecondaryButton type = "button">임시 저장</FormSecondaryButton>
          <FormPrimaryButton type = "button">공지 등록</FormPrimaryButton>
        </FormButtonRow>
      </FormCard>

      <NoticeListCard>
        <NoticeListTitle>공지 목록</NoticeListTitle>

        {notices.map((item) => (
          <NoticeItem key = {item.id}>
            <div>
              <NoticeItemTitle>{item.title}</NoticeItemTitle>
              <NoticeItemMeta>
                {item.createdAt} · {item.status}
              </NoticeItemMeta>
            </div>

            <TableActionRow>
              <TableActionButton type = "button">수정</TableActionButton>
              <TableActionButton type = "button">삭제</TableActionButton>
            </TableActionRow>
          </NoticeItem>
        ))}
      </NoticeListCard>
    </AdminSubPageWrapper>
  );
}