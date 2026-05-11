import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const cardBase = css`
  border: 1px solid #e5e7eb;
  background: #ffffff;

  html.dark & {
    border-color: rgba(55, 65, 81, 0.5);
    background: #1a1a1a;
  }
`;

export const AdminSubPageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const SubPageHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const SubPageTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

export const SubPageTitle = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const SubPageDescription = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: #6b7280;

  html.dark & {
    color: #9ca3af;
  }
`;

export const SubPagePrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;

  .link-arrow {
    width: 1rem;
    height: 1rem;
    margin-left: 0.25rem;
  }
`;

export const SearchFilterRow = styled.div`
  display: flex;
  gap: 0.875rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 280px;

  .search-icon {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    color: #9ca3af;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 2.875rem;
  padding: 0 1rem 0 2.6rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 0.875rem;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  html.dark & {
    border-color: #262626;
    background: #111827;
    color: #ffffff;
  }
`;

export const FilterSelect = styled.select`
  height: 2.875rem;
  min-width: 160px;
  padding: 0 0.875rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 0.875rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  html.dark & {
    border-color: #262626;
    background: #111827;
    color: #ffffff;
  }
`;

export const DataCard = styled.section`
  ${cardBase};
  padding: 1.25rem;
  border-radius: 1rem;
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.875rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid #f3f4f6;
    vertical-align: middle;
  }

  th {
    font-size: 0.8125rem;
    font-weight: 600;
    color: #6b7280;
    white-space: nowrap;
  }

  td {
    font-size: 0.875rem;
    color: #111827;
  }

  html.dark & {
    th,
    td {
      border-bottom-color: #262626;
    }

    th {
      color: #9ca3af;
    }

    td {
      color: #ffffff;
    }
  }
`;

export const TableBadge = styled.span<{
  $variant?: 'default' | 'admin' | 'success' | 'pending' | 'warning' | 'danger';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.5rem;
  height: 1.75rem;
  padding: 0 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $variant, theme }) =>
    $variant === 'admin'
      ? css`
          background: rgba(37, 99, 235, 0.1);
          color: ${theme.colors.accent};

          html.dark & {
            background: rgba(37, 99, 235, 0.18);
          }
        `
      : $variant === 'success'
      ? css`
          background: rgba(34, 197, 94, 0.12);
          color: #16a34a;

          html.dark & {
            background: rgba(34, 197, 94, 0.18);
          }
        `
      : $variant === 'pending'
      ? css`
          background: rgba(245, 158, 11, 0.12);
          color: #d97706;

          html.dark & {
            background: rgba(245, 158, 11, 0.18);
          }
        `
      : $variant === 'warning'
      ? css`
          background: rgba(249, 115, 22, 0.12);
          color: #ea580c;

          html.dark & {
            background: rgba(249, 115, 22, 0.18);
          }
        `
      : $variant === 'danger'
      ? css`
          background: rgba(239, 68, 68, 0.12);
          color: #dc2626;

          html.dark & {
            background: rgba(239, 68, 68, 0.18);
          }
        `
      : css`
          background: #f3f4f6;
          color: #374151;

          html.dark & {
            background: #1f2937;
            color: #d1d5db;
          }
        `}
`;

export const TableActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const TableActionButton = styled.button`
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.625rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 0.8125rem;
  font-weight: 500;

  &:hover {
    background: #f9fafb;
  }

  html.dark & {
    border-color: #262626;
    background: #111827;
    color: #ffffff;

    &:hover {
      background: #0a0a0a;
    }
  }
`;

export const FormCard = styled.section`
  ${cardBase};
  padding: 1.25rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & + & {
    margin-top: 1rem;
  }
`;

export const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const FormInput = styled.input`
  height: 2.875rem;
  padding: 0 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 0.875rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  html.dark & {
    border-color: #262626;
    background: #111827;
    color: #ffffff;
  }
`;

export const FormTextArea = styled.textarea`
  min-height: 180px;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.6;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  html.dark & {
    border-color: #262626;
    background: #111827;
    color: #ffffff;
  }
`;

export const FormButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const FormPrimaryButton = styled.button`
  height: 2.75rem;
  padding: 0 1rem;
  border-radius: 0.75rem;
  border: none;
  background: ${({ theme }) => theme.colors.accent};
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.accent} 90%,
      transparent
    );
  }
`;

export const FormSecondaryButton = styled.button`
  height: 2.75rem;
  padding: 0 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background: #f9fafb;
  }

  html.dark & {
    border-color: #262626;
    background: #111827;
    color: #ffffff;

    &:hover {
      background: #0a0a0a;
    }
  }
`;

export const NoticeListCard = styled.section`
  ${cardBase};
  padding: 1.25rem;
  border-radius: 1rem;
`;

export const NoticeListTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  html.dark & {
    border-bottom-color: #262626;
  }
`;

export const NoticeItemTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const NoticeItemMeta = styled.p`
  margin: 0.375rem 0 0;
  font-size: 0.8125rem;
  color: #6b7280;

  html.dark & {
    color: #9ca3af;
  }
`;