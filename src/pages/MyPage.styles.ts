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

const buttonBase = css`
  height: 2.75rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  .button-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

export const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const HeaderSection = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;

  html.dark & {
    color: #9ca3af;
  }
`;

export const Card = styled.section`
  ${cardBase};
  padding: 2rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

export const ProfileAvatar = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.accent};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  span {
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1;
  }
`;

export const ProfileContent = styled.div`
  flex: 1;
`;

export const ProfileTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ProfileInfo = styled.div``;

export const ProfileName = styled.h2`
  margin: 0 0 0.25rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const ProfileEmail = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;

  html.dark & {
    color: #9ca3af;
  }
`;

export const OutlineButton = styled.button<{
  $fullWidth?: boolean;
  $justifyStart?: boolean;
}>`
  ${buttonBase};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  justify-content: ${({ $justifyStart }) =>
    $justifyStart ? 'flex-start' : 'center'};
  border: 1px solid #e5e7eb;
  background: transparent;
  color: #111827;

  &:hover {
    background: #f3f4f6;
  }

  html.dark & {
    border-color: #374151;
    color: #ffffff;

    &:hover {
      background: #1f2937;
    }
  }
`;

export const PrimaryButton = styled.button<{ $fullWidth?: boolean }>`
  ${buttonBase};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: none;
  background: ${({ theme }) => theme.colors.accent};
  color: #ffffff;

  &:hover {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.colors.accent} 90%,
      transparent
    );
  }
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const StatItem = styled.div``;

export const StatValue = styled.span`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const StatLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;

  html.dark & {
    color: #9ca3af;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const SectionIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;

  html.dark & {
    color: #ffffff;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 2.75rem;
  margin-top: 0.5rem;
  padding: 0 1rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  background: #f3f4f6;
  color: #111827;
  font-size: 0.9375rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &:disabled {
    opacity: 1;
    cursor: not-allowed;
  }

  html.dark & {
    background: #191919;
    color: #ffffff;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
    }
  }
`;

export const HelperText = styled.p`
  margin: 0.375rem 0 0;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.5;

  html.dark & {
    color: #9ca3af;
  }
`;

export const InfoText = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: #6b7280;

  html.dark & {
    color: #9ca3af;
  }
`;

export const PlanRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.125rem 0;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin: 0.875rem 0;
  background: #e5e7eb;

  html.dark & {
    background: #374151;
  }
`;

export const ActionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DangerButton = styled.button`
  ${buttonBase};
  width: 100%;
  justify-content: flex-start;
  border: 1px solid #fecaca;
  background: transparent;
  color: #dc2626;

  &:hover {
    background: #fef2f2;
  }

  html.dark & {
    border-color: rgba(220, 38, 38, 0.45);
    color: #f87171;

    &:hover {
      background: rgba(127, 29, 29, 0.2);
    }
  }
`;

export const FullWidthLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`;