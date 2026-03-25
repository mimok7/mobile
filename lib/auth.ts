import type { User } from '@supabase/supabase-js';

const MANAGER_ROLE_CANDIDATES = ['manager', 'admin_manager', 'super_manager'];

const normalizeRole = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase();
};

const extractRoles = (user: User): string[] => {
  const candidates: unknown[] = [];

  candidates.push(user.user_metadata?.role);
  candidates.push(user.app_metadata?.role);

  if (Array.isArray(user.user_metadata?.roles)) {
    candidates.push(...user.user_metadata.roles);
  }

  if (Array.isArray(user.app_metadata?.roles)) {
    candidates.push(...user.app_metadata.roles);
  }

  return candidates
    .map(normalizeRole)
    .filter((role): role is string => role.length > 0);
};

export const isManagerUser = (user: User | null | undefined): boolean => {
  if (!user) return false;
  const roles = extractRoles(user);
  return roles.some((role) => MANAGER_ROLE_CANDIDATES.includes(role));
};

export const isPublicPath = (pathname: string): boolean => {
  return pathname === '/login';
};
