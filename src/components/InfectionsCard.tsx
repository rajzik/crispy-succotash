import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Flex } from 'antd';
import Grid from 'antd/es/card/Grid';

import { FavoriteIconButton } from '~/components/FavoritedIcon';
import { InfectionsChart } from '~/components/InfectionsChart';
import { api } from '~/trpc/server';

export const InfectionsCard = async () => {
  const data = await api.covid.infections();

  return (
    <Card
      bordered={false}
      title="Infections in a week"
      classNames={{
        body: 'p-0',
      }}
      extra={<FavoriteIconButton postId="infection" />}
    >
      <div className="px-2">
        <InfectionsChart infections={data} />
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
