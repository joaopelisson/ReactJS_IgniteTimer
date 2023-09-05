import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountdownButton } from "./styles";
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupteDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);


    // function handleCreateNewCycle(data: newCycleFormData) {
    //     const id = String(new Date().getTime());

    //     const newCycle: Cycle = {
    //         id,
    //         minutesAmount: data.minutesAmount,
    //         task: data.task,
    //         startDate: new Date()
    //     };

    //     setCycles((state) => [...state, newCycle]);
    //     setActiveCycleId(id);
    //     setAmountSecondsPassed(0);

    //     reset();
    // }

    function handleInterruptCycle() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interrupteDate: new Date() }
            }
            else {
                return cycle
            }
        }));
        setActiveCycleId(null);
    }

    function markCurrentCycleAsFinished() {
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            }
            else {
                return cycle
            }
        }));

    }

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId);

    // const task = watch('task');
    // const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
                    {/* <NewCycleForm /> */}
                    <Countdown />
                </CyclesContext.Provider>
                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountDownButton /* disabled={isSubmitDisabled} */ type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}