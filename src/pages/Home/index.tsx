import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, StopCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser no mínimo de 60 minutos.')
        .max(60, 'O ciclo precisa ser no máximo de 60 minutos.'),
})
interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interrupteDate?: Date;
    finishedDate?: Date;
}
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);


    function handleCreateNewCycle(data: newCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            minutesAmount: data.minutesAmount,
            task: data.task,
            startDate: new Date()
        };

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);

        reset();
    }

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

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId);
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    const task = watch('task');
    const isSubmitDisabled = !task

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {

                const differenceSeconds = differenceInSeconds(new Date(), activeCycle.startDate);

                if (differenceSeconds >= totalSeconds) {
                    setCycles(state => state.map(cycle => {
                        if (cycle.id === activeCycleId) {
                            return { ...cycle, finishedDate: new Date() }
                        }
                        else {
                            return cycle
                        }
                    }));

                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setAmountSecondsPassed(differenceSeconds)
                }


            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId]);

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds]);

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <NewCycleForm />
                <Countdown />
                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}