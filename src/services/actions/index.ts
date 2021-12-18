import type { TAuthActions } from './auth'
import type { TConstructorActions } from './constructor'
import type { TIngredientActions } from './ingredients'
import type { TOrderActions } from './order'
import type { TOrdersActions } from './orders'
import type { TResetPassActions } from './reset-pass'
import type { TRestorePassActions } from './restore-pass'
import type { TUserActions } from './user'

export type TAppActions = TAuthActions | TConstructorActions | TIngredientActions | TOrderActions | TOrdersActions | TResetPassActions | TRestorePassActions | TUserActions
