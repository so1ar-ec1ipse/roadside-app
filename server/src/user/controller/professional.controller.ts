import {
  Controller,
  Get,
  UseGuards,
  Session,
  Post,
  Body,
} from '@nestjs/common';
import { ProfessionalService } from '../service/professional.service';
import { RoleGuard } from 'src/auth/auth.guard';
import { RequiresRoles } from 'src/auth/roles.decorator';
import { ISession } from 'src/auth/session.interface';
import { ResponseSuccess, ResponseError } from 'src/server-response.dto';
import { DtoProfessionalDetails } from '../dto/profession-details.dto';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Get('details')
  @UseGuards(RoleGuard)
  @RequiresRoles('professional')
  async getProfessional(@Session() session: ISession) {
    const result = await this.professionalService.getProfessionalById(
      session.user.userId,
    );
    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not get user details');
  }

  @Post('details')
  @UseGuards(RoleGuard)
  @RequiresRoles('professional')
  async setProfessionalDetails(
    @Body() details: DtoProfessionalDetails,
    @Session() session: ISession,
  ) {
    const userId = session.user.userId;

    const result = await this.professionalService.setProfessionalDetails(
      userId,
      details,
    );

    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not update user details');
  }
}
