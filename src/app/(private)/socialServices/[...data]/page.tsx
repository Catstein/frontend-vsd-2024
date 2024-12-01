import { PrivatePage } from "@/components/PrivatePage";
import { ProjectForm } from "./_lib/components/ProjectForm";

interface ProjectPageProps {
  params: Promise<{
    data: string[];
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { data } = await params;
  const [projectUid] = data;

  if (projectUid === "create") {
    return (
      <PrivatePage>
        <ProjectForm />
      </PrivatePage>
    );
  }

  if (projectUid !== "create") {
    return (
      <PrivatePage>
        <ProjectForm serviceUid={projectUid} />
      </PrivatePage>
    );
  }
}
