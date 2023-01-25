export interface IModelContext {
  indefiniteArticle: string
  modelName: string
  modelNamePlural: string
  modelNameLowerCase: string
  modelNameLowerCasePlural: string
}

export const defaultState = {
  indefiniteArticle: 'a',
  modelName: 'Model',
  modelNamePlural: 'Models',
  modelNameLowerCase: 'model',
  modelNameLowerCasePlural: 'models',
}
