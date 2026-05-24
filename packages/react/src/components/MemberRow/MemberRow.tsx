import { cx } from '../../primitives/clsx.js';
import type { MemberRowProps } from './MemberRow.types.js';

export function MemberRow({ avatar, email, role, joinedAt, actions, className }: MemberRowProps) {
  const avatarContent =
    typeof avatar === 'string'
      ? avatar
      : avatar != null
        ? avatar
        : (email[0]?.toUpperCase() ?? '?');

  return (
    <div className={cx('tln-member-row', 'member-row', className)}>
      <div className="tln-member-row__avatar av" aria-hidden="true">
        {avatarContent}
      </div>
      <span className="tln-member-row__email email">{email}</span>
      {role && <span className="tln-member-row__role">{role}</span>}
      {joinedAt && <span className="tln-member-row__joined joined">{joinedAt}</span>}
      {actions && <div className="tln-member-row__actions">{actions}</div>}
    </div>
  );
}

MemberRow.displayName = 'MemberRow';
