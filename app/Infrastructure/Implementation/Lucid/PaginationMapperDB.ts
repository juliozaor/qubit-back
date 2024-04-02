import { LucidRow, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import { Pager } from 'App/Domain/Pager'

export class PaginationMapperDB {

  public static getPager<T extends LucidRow>(pager:ModelPaginatorContract<T>): Pager {
    return new Pager(pager.total, pager.currentPage, pager.lastPage)
  }
}

