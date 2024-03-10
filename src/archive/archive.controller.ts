import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { AuthGuard } from 'src/auth/auth.guard'; 
import { ArchiveUpdateDto } from './models/archive-update.dto';
import { ArchiveCreateDto } from './models/archive-create.dto';
import { ArchiveService } from './archive.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('archives')
export class ArchiveController { constructor(
    private archiveService: ArchiveService
) {}
 
@Get()
async All() {
  return this.archiveService.paginate();
}

@Post()
async create(
    @Body() body: ArchiveCreateDto
) {
    return this.archiveService.create(body);
}

@Get('get/:id')
async get(@Param('id') id: number) {
    return this.archiveService.findGetOne({id});
}

@Put(':id')
async update(
    @Param('id') id: number,
    @Body() body: ArchiveUpdateDto
) {
    const update_created = new Date();
    await this.archiveService.update(id, {...body, update_created}); 
    return this.archiveService.findOne({where: {id}});
}

@Delete(':id')
async delete(@Param('id') id: number) {
    return this.archiveService.delete(id);
}
}
