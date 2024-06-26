import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from './commands';
import { GetUsersQuery } from './queries';

import { UserView, User } from '#users/domain/models';

@Injectable()
export class UserFacade {
  public constructor(
    private readonly commandBud: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async create(command: CreateUserCommand): Promise<User> {
    return this.commandBud.execute(command);
  }

  public findAll(): Promise<UserView[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }
}
