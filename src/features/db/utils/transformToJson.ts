import { Types } from 'mongoose'

type WithIdAndVersion = {
  _id: Types.ObjectId
  __v: number
}

type WithId<T> = Omit<T, '_id' | '__v'> & { id: string }

export const transformToJson = <T extends WithIdAndVersion>(
  _: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { _id, __v, ...rest }: T,
): WithId<T> => ({ ...rest, id: _id.toString() })
