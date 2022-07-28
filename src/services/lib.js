import { getDescriptor, parseDescriptor } from '@craftercms/content';
import { firstValueFrom, map } from 'rxjs';

export async function getModel(path = '/site/website/index.xml') {
  return await firstValueFrom(
    getDescriptor(path, { flatten: true }).pipe(
      map(parseDescriptor)
      // Can use this for debugging purposes.
      // tap(console.log)
    )
  );
}