'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useActionState} from "react";
import {signupAction, SignUpState} from "@/app/signup/actions";
import ErrorMessage from "@/components/error-message";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  // для отправки формы при нажатии по кнопке регистрации
  const [stateFormAction, setStateFormAction] = useActionState<SignUpState | null, FormData>(signupAction, null)
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={setStateFormAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Имя</FieldLabel>
              <Input id="name" name='name' type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="mail@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input id="password" name='password' type="password" required />
              <FieldDescription>
                Пароль должен быть более 8 символов.
              </FieldDescription>
            </Field>
            {stateFormAction?.error && <ErrorMessage message={stateFormAction.error} />}
            <FieldGroup>
              <Field>
                <Button type="submit">Создать аккаунт</Button>
                <FieldDescription className="px-6 text-center">
                  У Вас уже есть аккаунт? <a href="/login">Войти</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
