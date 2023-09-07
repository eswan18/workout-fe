import ClientModal from "@/components/ClientModal";
import { Workout, WorkoutType } from "@/lib/resources/apiTypes";
import { useRouter } from "next/navigation";

type MoreWorkoutTypesModalProps = {
  workoutTypes: WorkoutType[];
  handleClose: () => void;
  createAndStartWorkout: (
    workoutTypeId: string | undefined,
  ) => Promise<Workout>;
};

export default function MoreWorkoutTypesModal({
  workoutTypes,
  handleClose,
  createAndStartWorkout,
}: MoreWorkoutTypesModalProps) {
  const router = useRouter();
  // Start by alphabetizing the workout types.
  workoutTypes.sort((a, b) => {
    if (!a.name || !b.name) throw new Error("Workout type name is null");
    return a.name.localeCompare(b.name);
  });
  const rows = workoutTypes.map((workoutType) => {
    const onClick = () => {
      createAndStartWorkout(workoutType.id).then((workout) => {
        router.push(`/live/workouts/${workout.id}`);
      });
    };
    return (
      <tr
        className="cursor-pointer even:bg-gray-50 dark:even:bg-gray-800 border-y-[1px] border-gray-200 dark:border-gray-700"
        onClick={onClick}
        key={workoutType.id}
        title={workoutType.name}
      >
        <td className="px-2 py-1">{workoutType.name}</td>
        <td>
          <i className="fi fi-rr-arrow-alt-circle-right text-xl inline-flex align-[-0.2rem] text-gold px-1" />
        </td>
      </tr>
    );
  });
  const createAndStartCustomWorkout = () => {
    createAndStartWorkout(undefined).then((workout) => {
      router.push(`/live/workouts/${workout.id}`);
    });
  };
  const createNewWorkoutType = () => {
    router.push("/workout-types/new");
  };
  return (
    <ClientModal handleClose={handleClose}>
      <div className="flex flex-col max-w-md h-128 m-auto gap-6">
        <h2 className="text-lg lg:text-2xl font-bold">Start a Workout</h2>
        <div className="flex flex-row justify-between items-center w-full gap-2 lg:gap-4 lg:pb-4">
          <div className="flex flex-col px-2">
            <h3 className="text-lg">Workout Types</h3>
            <div className="w-48 h-48 overflow-y-scroll flex-grow flex-shrink-0 mx-auto">
              <table className="w-full table-auto border-collapse">
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
          <div>
            <p className="text-lg text-gray-500 dark:text-gray-400">OR</p>
          </div>
          <div className="w-[40%] flex-shrink flex flex-col items-center text-gold text-sm gap-6 max-w-xl">
            <button onClick={createNewWorkoutType}>
              <div className="flex flex-row justify-between items-center gap-2 px-2">
                <i className="fi fi-rr-square-plus inline-flex align-[-0.5rem] text-3xl" />
                <p className="text-left">
                  Create a <span className="font-bold">new</span> type of
                  workout
                </p>
              </div>
            </button>
            <button onClick={createAndStartCustomWorkout}>
              <div className="flex flex-row justify-between items-center gap-2 px-2">
                <i className="fi fi-rr-square-plus inline-flex align-[-0.5rem] text-3xl" />
                <p className="text-left">
                  Start a <span className="font-bold">custom</span> workout
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </ClientModal>
  );
}
