import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Bell, User } from 'lucide-react';
import {
  HeaderWrapper,
  HeaderInner,
  LogoLink,
  LogoIcon,
  LogoText,
  Nav,
  NavItemLink,
  GhostButton,
  IconButton,
  BadgeBubble,
  RightActions,
  DropdownWrapper,
  DropdownPanel,
  DropdownHeader,
  DropdownTitle,
  DropdownHeaderButton,
  NotificationList,
  NotificationItem,
  NotificationIconBox,
  NotificationContent,
  NotificationTopRow,
  NotificationTitle,
  NotificationUnreadDot,
  NotificationDescription,
  NotificationTime,
  DropdownFooter,
  FooterButtonLink,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  ProfileMenuList,
  ProfileMenuLink,
} from './Header.styles';

type NotificationVariant = 'blue' | 'green' | 'purple' | 'orange' | 'gray';

type NotificationItemType = {
  id: number;
  title: string;
  description: string;
  unread: boolean;
  type: NotificationVariant;
  createdAt: Date;
};

function formatNotificationTime(date: Date) {
  const now = Date.now();
  const diff = now - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return '방금 전';
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}분 전`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}시간 전`;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${dayOfMonth} ${hours}:${minutes}`;
}

export default function Header() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItemType[]>([
    {
      id: 1,
      title: '회의 분석이 완료되었습니다',
      description: '"주간 마케팅 회의" 분석 결과를 확인해보세요',
      unread: true,
      type: 'blue',
      createdAt: new Date(Date.now() - 30 * 1000),
    },
    {
      id: 2,
      title: '새로운 Todo가 생성되었습니다',
      description: '마케팅 자료 준비하기 외 2건이 추가되었습니다',
      unread: true,
      type: 'green',
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: 3,
      title: '일정이 추가되었습니다',
      description: '내일 오후 2:00 - 팀 미팅',
      unread: true,
      type: 'purple',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: 4,
      title: 'Todo 마감이 임박했습니다',
      description: '"예산안 검토"가 오늘 마감입니다',
      unread: false,
      type: 'orange',
      createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
    },
    {
      id: 5,
      title: '회의 참여 요청',
      description: '김철수님이 "Q1 결산 회의"에 초대했습니다',
      unread: false,
      type: 'gray',
      createdAt: new Date(Date.now() - 55 * 60 * 60 * 1000),
    },
  ]);

  const unreadCount = notifications.filter((item) => item.unread).length;

  const handleReadAll = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoLink to = "/">
          <LogoIcon>
            <span>A</span>
          </LogoIcon>
          <LogoText>Acta</LogoText>
        </LogoLink>

        <Nav>
          <NavItemLink to = "/meetings">
            <GhostButton type = "button">내 회의</GhostButton>
          </NavItemLink>
          <NavItemLink to = "/calendar">
            <GhostButton type = "button">일정</GhostButton>
          </NavItemLink>
          <NavItemLink to = "/todo">
            <GhostButton type = "button">Todo</GhostButton>
          </NavItemLink>
        </Nav>

        <RightActions>
          <DropdownWrapper>
            <IconButton
              type = "button"
              onClick = {() => {
                setIsNotificationOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
            >
              <Bell className = "icon" />
              {unreadCount > 0 && <BadgeBubble>{unreadCount}</BadgeBubble>}
            </IconButton>

            {isNotificationOpen && (
              <DropdownPanel $type = "notification">
                <DropdownHeader>
                  <DropdownTitle>알림</DropdownTitle>
                  <DropdownHeaderButton type = "button" onClick = {handleReadAll}>
                    모두 읽음
                  </DropdownHeaderButton>
                </DropdownHeader>

                <NotificationList>
                  {notifications.map((item) => (
                    <NotificationItem key = {item.id}>
                      <NotificationIconBox $variant = {item.type}>
                        {item.type === 'blue' && <Bell className = "notify-icon" />}

                        {item.type === 'green' && (
                          <svg
                            className = "notify-icon"
                            fill = "none"
                            viewBox = "0 0 24 24"
                            stroke = "currentColor"
                          >
                            <path
                              strokeLinecap = "round"
                              strokeLinejoin = "round"
                              strokeWidth = {2}
                              d = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>
                        )}

                        {item.type === 'purple' && (
                          <svg
                            className = "notify-icon"
                            fill = "none"
                            viewBox = "0 0 24 24"
                            stroke = "currentColor"
                          >
                            <path
                              strokeLinecap = "round"
                              strokeLinejoin = "round"
                              strokeWidth = {2}
                              d = "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        )}

                        {item.type === 'orange' && (
                          <svg
                            className = "notify-icon"
                            fill = "none"
                            viewBox = "0 0 24 24"
                            stroke = "currentColor"
                          >
                            <path
                              strokeLinecap = "round"
                              strokeLinejoin = "round"
                              strokeWidth = {2}
                              d = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}

                        {item.type === 'gray' && (
                          <svg
                            className = "notify-icon"
                            fill = "none"
                            viewBox = "0 0 24 24"
                            stroke = "currentColor"
                          >
                            <path
                              strokeLinecap = "round"
                              strokeLinejoin = "round"
                              strokeWidth = {2}
                              d = "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        )}
                      </NotificationIconBox>

                      <NotificationContent>
                        <NotificationTopRow>
                          <NotificationTitle>{item.title}</NotificationTitle>
                          {item.unread && <NotificationUnreadDot />}
                        </NotificationTopRow>

                        <NotificationDescription>
                          {item.description}
                        </NotificationDescription>

                        <NotificationTime>
                          {formatNotificationTime(item.createdAt)}
                        </NotificationTime>
                      </NotificationContent>
                    </NotificationItem>
                  ))}
                </NotificationList>

                <DropdownFooter>
                  <FooterButtonLink to = "/notifications">
                    모든 알림 보기
                  </FooterButtonLink>
                </DropdownFooter>
              </DropdownPanel>
            )}
          </DropdownWrapper>

          <DropdownWrapper>
            <IconButton
              type = "button"
              $rounded
              $filled
              onClick = {() => {
                setIsProfileOpen((prev) => !prev);
                setIsNotificationOpen(false);
              }}
            >
              <User className = "icon" />
            </IconButton>

            {isProfileOpen && (
              <DropdownPanel $type = "profile">
                <ProfileInfo>
                  <ProfileName>홍길동</ProfileName>
                  <ProfileEmail>hong@acta.com</ProfileEmail>
                </ProfileInfo>

                <ProfileMenuList>
                  <ProfileMenuLink to = "/my">마이페이지</ProfileMenuLink>
                  <ProfileMenuLink to = "/settings">환경설정</ProfileMenuLink>
                  <ProfileMenuLink to = "/landing" $danger>
                    로그아웃
                  </ProfileMenuLink>
                </ProfileMenuList>
              </DropdownPanel>
            )}
          </DropdownWrapper>
        </RightActions>
      </HeaderInner>
    </HeaderWrapper>
  );
}