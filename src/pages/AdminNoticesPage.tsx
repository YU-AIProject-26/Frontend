import { useMemo, useState } from 'react';
import { ChevronRight, X, Megaphone } from 'lucide-react';
import {
  AdminSubPageWrapper,
  SubPageHeader,
  SubPageTitle,
  SubPageDescription,
  SubPageTopRow,
  SubPagePrimaryLink,
  SummaryRow,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
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
  EmptyStateBox,
  EmptyStateText,
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
  TableBadge,
} from './AdminSubPage.styles';
import AdminActionToast from '../components/AdminActionToast';

type NoticeStatus = '게시중' | '임시저장';

type NoticeItemType = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  status: NoticeStatus;
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeItemType[]>([
    {
      id: 1,
      title: '서비스 점검 안내',
      content:
        '2026년 5월 14일 오전 2시부터 4시까지 시스템 점검이 진행될 예정입니다.',
      createdAt: '2026.05.12',
      status: '게시중',
    },
    {
      id: 2,
      title: '신규 기능 업데이트 예정',
      content:
        '회의 분석 결과 다운로드 기능과 관리자 페이지 확장 기능이 준비 중입니다.',
      createdAt: '2026.05.11',
      status: '임시저장',
    },
  ]);

  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [selectedNotice, setSelectedNotice] = useState<NoticeItemType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    variant: 'success' | 'error';
  }>({
    open: false,
    message: '',
    variant: 'success',
  });

  const summary = useMemo(() => {
    return {
      total: notices.length,
      published: notices.filter((item) => item.status === '게시중').length,
      draft: notices.filter((item) => item.status === '임시저장').length,
    };
  }, [notices]);

  const showToast = (message: string, variant: 'success' | 'error' = 'success') => {
    setToast({
      open: true,
      message,
      variant,
    });
  };

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const resetForm = () => {
    setTitleInput('');
    setContentInput('');
    setEditingId(null);
  };

  const handleSaveDraft = () => {
    const trimmedTitle = titleInput.trim();
    const trimmedContent = contentInput.trim();

    if (!trimmedTitle || !trimmedContent) {
      showToast('공지 제목과 내용을 모두 입력해주세요.', 'error');
      return;
    }

    if (editingId !== null) {
      setNotices((prev) =>
        prev.map((notice) =>
          notice.id === editingId
            ? {
                ...notice,
                title: trimmedTitle,
                content: trimmedContent,
                status: '임시저장',
              }
            : notice
        )
      );
      showToast('공지사항이 임시 저장되었습니다.', 'success');
      resetForm();
      return;
    }

    const newNotice: NoticeItemType = {
      id: Date.now(),
      title: trimmedTitle,
      content: trimmedContent,
      createdAt: '2026.05.13',
      status: '임시저장',
    };

    setNotices((prev) => [newNotice, ...prev]);
    showToast('공지사항이 임시 저장되었습니다.', 'success');
    resetForm();
  };

  const handlePublishNotice = () => {
    const trimmedTitle = titleInput.trim();
    const trimmedContent = contentInput.trim();

    if (!trimmedTitle || !trimmedContent) {
      showToast('공지 제목과 내용을 모두 입력해주세요.', 'error');
      return;
    }

    if (editingId !== null) {
      setNotices((prev) =>
        prev.map((notice) =>
          notice.id === editingId
            ? {
                ...notice,
                title: trimmedTitle,
                content: trimmedContent,
                status: '게시중',
              }
            : notice
        )
      );
      showToast('공지사항이 수정되었습니다.', 'success');
      resetForm();
      return;
    }

    const newNotice: NoticeItemType = {
      id: Date.now(),
      title: trimmedTitle,
      content: trimmedContent,
      createdAt: '2026.05.13',
      status: '게시중',
    };

    setNotices((prev) => [newNotice, ...prev]);
    showToast('공지사항이 등록되었습니다.', 'success');
    resetForm();
  };

  const handleEditNotice = (notice: NoticeItemType) => {
    setEditingId(notice.id);
    setTitleInput(notice.title);
    setContentInput(notice.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDeleteModal = (notice: NoticeItemType) => {
    setSelectedNotice(notice);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedNotice(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteNotice = () => {
    if (!selectedNotice) return;

    setNotices((prev) =>
      prev.filter((notice) => notice.id !== selectedNotice.id)
    );

    if (editingId === selectedNotice.id) {
      resetForm();
    }

    showToast('공지사항이 삭제되었습니다.', 'success');
    closeDeleteModal();
  };

  return (
    <>
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

        <SummaryRow>
          <SummaryCard>
            <SummaryLabel>전체 공지</SummaryLabel>
            <SummaryValue>{summary.total}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>게시중</SummaryLabel>
            <SummaryValue>{summary.published}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>임시저장</SummaryLabel>
            <SummaryValue>{summary.draft}</SummaryValue>
          </SummaryCard>
        </SummaryRow>

        <FormCard>
          <FormGroup>
            <FormLabel htmlFor = "notice-title">공지 제목</FormLabel>
            <FormInput
              id = "notice-title"
              value = {titleInput}
              onChange = {(e) => setTitleInput(e.target.value)}
              placeholder = "공지 제목을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor = "notice-content">공지 내용</FormLabel>
            <FormTextArea
              id = "notice-content"
              value = {contentInput}
              onChange = {(e) => setContentInput(e.target.value)}
              placeholder = "공지 내용을 입력하세요"
            />
          </FormGroup>

          <FormButtonRow>
            {editingId !== null && (
              <FormSecondaryButton type = "button" onClick = {resetForm}>
                수정 취소
              </FormSecondaryButton>
            )}

            <FormSecondaryButton type = "button" onClick = {handleSaveDraft}>
              임시 저장
            </FormSecondaryButton>

            <FormPrimaryButton type = "button" onClick = {handlePublishNotice}>
              {editingId !== null ? '공지 수정' : '공지 등록'}
            </FormPrimaryButton>
          </FormButtonRow>
        </FormCard>

        <NoticeListCard>
          <NoticeListTitle>공지 목록</NoticeListTitle>

          {notices.length === 0 ? (
            <EmptyStateBox>
              <Megaphone className = "empty-icon" />
              <EmptyStateText>등록된 공지사항이 없습니다.</EmptyStateText>
            </EmptyStateBox>
          ) : (
            notices.map((item) => (
              <NoticeItem key = {item.id}>
                <div>
                  <NoticeItemTitle>{item.title}</NoticeItemTitle>
                  <NoticeItemMeta>
                    {item.createdAt} · {item.status}
                  </NoticeItemMeta>
                </div>

                <TableActionRow>
                  <TableActionButton
                    type = "button"
                    onClick = {() => handleEditNotice(item)}
                  >
                    수정
                  </TableActionButton>

                  <TableActionButton
                    type = "button"
                    onClick = {() => openDeleteModal(item)}
                  >
                    삭제
                  </TableActionButton>
                </TableActionRow>
              </NoticeItem>
            ))
          )}
        </NoticeListCard>
      </AdminSubPageWrapper>

      {isDeleteModalOpen && selectedNotice && (
        <ModalOverlay onClick = {closeDeleteModal}>
          <ModalCard onClick = {(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>공지사항을 삭제하시겠습니까?</ModalTitle>
                <ModalDescription>
                  삭제한 공지사항은 목록에서 바로 사라지며 복구할 수 없습니다
                </ModalDescription>
              </div>

              <ModalCloseButton type = "button" onClick = {closeDeleteModal}>
                <X className = "close-icon" />
              </ModalCloseButton>
            </ModalHeader>

            <ModalBody>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>공지 제목</InfoLabel>
                  <InfoValue>{selectedNotice.title}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>상태</InfoLabel>
                  <InfoValue>
                    <TableBadge
                      $variant = {
                        selectedNotice.status === '게시중' ? 'success' : 'pending'
                      }
                    >
                      {selectedNotice.status}
                    </TableBadge>
                  </InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>등록일</InfoLabel>
                  <InfoValue>{selectedNotice.createdAt}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>내용</InfoLabel>
                  <InfoValue>{selectedNotice.content}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </ModalBody>

            <ModalFooter>
              <ModalSecondaryButton type = "button" onClick = {closeDeleteModal}>
                취소
              </ModalSecondaryButton>

              <ModalPrimaryButton type = "button" onClick = {handleDeleteNotice}>
                삭제하기
              </ModalPrimaryButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      )}

      <AdminActionToast
        open = {toast.open}
        message = {toast.message}
        variant = {toast.variant}
        onClose = {closeToast}
      />
    </>
  );
}