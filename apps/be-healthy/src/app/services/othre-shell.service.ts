import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OthreShellService {
  readonly PAGE_TITLES = {
    more: 'その他',
    profile: 'ユーザー情報',
    usage: '使用方法',
    legal: '特定商取引法に基づく表示',
    terms: '利用規約',
    account: 'アカウント削除',
  };
  title: string;

  constructor() {}
}
