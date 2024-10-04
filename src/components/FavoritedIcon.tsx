'use client';

import type { FC } from 'react';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { api } from '~/trpc/react';

const useLocalStorageId = () => {
  if (typeof window !== 'undefined') {
    let id = window.localStorage.getItem('id');
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem('id', id);
    }
    return id;
  }
};

export const FavoriteIconButton: FC<{
  postId: string;
}> = ({ postId }) => {
  const userId = useLocalStorageId();
  const utils = api.useUtils();

  const { data, isPending } = api.favorite.getFavorite.useQuery(
    {
      userId: userId!,
      postId: postId,
    },
    {
      enabled: Boolean(userId),
    },
  );

  const isFavorite = data?.favorite ?? false;

  const updateFavorite = api.favorite.setFavorite.useMutation({
    onSuccess: async () => {
      await utils.favorite.invalidate();
    },
  });

  return (
    <Button
      loading={
        (updateFavorite.variables?.postId === postId &&
          updateFavorite.isPending) ||
        isPending
      }
      disabled={
        (updateFavorite.variables?.postId === postId &&
          updateFavorite.isPending) ||
        isPending
      }
      onClick={() => {
        updateFavorite.mutate({
          userId: userId!,
          postId: postId,
          id: data?.id,
          favorite: !isFavorite,
        });
      }}
      shape="circle"
      size="small"
      icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
    />
  );
};
