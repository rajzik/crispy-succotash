import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Flex } from 'antd';

import { FavoriteIconButton } from '~/components/FavoritedIcon';
import { VariantsChart } from '~/components/VariantsChart';
import { api } from '~/trpc/server';

export const VariantsCard = async () => {
  const data = await api.covid.variants();

  return (
    <Card
      bordered={false}
      title="Variants in a week"
      classNames={{
        body: 'p-0',
      }}
      extra={<FavoriteIconButton postId="variants" />}
    >
      <div className="px-2">
        <VariantsChart variants={data} />
      </div>

      <Divider className="m-0 pb-2" />
      <Flex
        justify="space-between"
        className="px-2 pb-3"
      >
        <Avatar
          key="avatar"
          icon={<UserOutlined />}
        />
        <Button
          key="button"
          color="default"
          variant="text"
          icon={<CommentOutlined />}
          iconPosition="end"
        >
          3
        </Button>
      </Flex>
    </Card>
  );
};
