import {
    Body,
    Controller,
    Delete,
    Get, 
    Param,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';
  import {
    CreateSkillDto, 
    FilterSkillDto, 
    UpdateSkillDto,
  } from '../dtos'; 
import { SkillService } from '../services/skill.service';
  
  @Controller('/skill')
  export class SkillController {
    constructor(private readonly skillService: SkillService) {}
  
    @Post('/')
    async createSkill(@Body() skillDto: CreateSkillDto): Promise<any> {
      const skill = await this.skillService.create(skillDto);
      return { skill };
    }
  
    @Patch('/:_id')
    async updateSkill(@Param('_id') _id: string, @Body() skillDto: UpdateSkillDto): Promise<any> {
      const skill = await this.skillService.update(_id, skillDto);
      return { skill };
    }
  
    @Delete('/:_id')
    async deleteSkill(@Param('_id') _id: string): Promise<any> {
      const skill = await this.skillService.delete(_id)
      return {message: "successfully deleted!"}
    }
  
    @Get('/:_id')
    async getByIdSkill(@Param('_id') _id: string): Promise<any> { 
      const skill = await this.skillService.findById(_id);
      return { skill }
    }
  
    @Get('/')
    async filterSkill(@Query() params: FilterSkillDto): Promise<any> { 
      const skill = await this.skillService.find(params)
      return { skill }
    }
  }
  