'use client'

import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import {useActionState, useState} from "react";
import {loginAction, LoginState} from "@/app/login/actions";
import ErrorMessage from "@/components/error-message";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [state, formAction] = useActionState<LoginState | null, FormData>(loginAction, null)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войти с помощью Вашего аккаунта</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mail@example.com"
                  required
                />
              </Field>
              {
                state?.error && <ErrorMessage message={state.error} />
              }
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                </div>
                <Input id="password" name='password' type="password" required />
              </Field>
              <Field>
                <Button type="submit">Войти</Button>
                <FieldDescription className="text-center">
                  Нет аккаунта? <a href="/signup">Заригистрироваться</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
