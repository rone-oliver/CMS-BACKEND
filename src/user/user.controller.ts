import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { USER_PATHS } from './constants/user-path.constants';

@ApiTags(USER_PATHS.ROOT)
@Controller(USER_PATHS.ROOT)
export class UserController {}
