import { Typography } from "antd";
import { AnswerCard } from "../../../shared/components/answer-card";
import { RandomUserTable } from "../components/random-user-table";
import { RandomUserToolbar } from "../components/random-user-toolbar";
import { useRandomUsers } from "../hooks/use-random-users";

const { Title } = Typography;

export function RandomUserAnswer() {
  const randomUsers = useRandomUsers();

  return (
    <AnswerCard
      endpoints={[{ method: "GET", path: "/random-users?results=10&page=1&search=" }]}
      number={4}
      summary="Daftar pengguna RandomUser dengan pencarian data."
      title="Daftar RandomUser"
    >
      <section className="random-user-list">
        <Title className="random-user-list-title" level={3}>
          List
        </Title>

        <RandomUserToolbar
          loading={randomUsers.loading}
          onAddData={() => void randomUsers.loadPage(randomUsers.page + 1, true)}
          onQueryChange={randomUsers.setQuery}
          query={randomUsers.query}
        />

        <RandomUserTable loading={randomUsers.loading} users={randomUsers.users} />
      </section>
    </AnswerCard>
  );
}
