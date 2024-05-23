import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/technical/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/technical/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/technical/ui/form';
import { Switch } from '@/technical/ui/switch';

import { defaultSettings } from '../constants';
import { Settings, settingsSchema } from '../model/settings';
import { useSettings } from '../services/use-settings';

const SettingsForm = () => {
  /**
   * Used to display a success message when the form
   * is successfully submitted.
   */
  const [justSubmitted, setJustSubmitted] = useState(false);

  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettings,
  });
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    form.reset(settings);
  }, [form, settings]);

  /**
   * Handle the success message display time.
   */
  useEffect(() => {
    if (justSubmitted) {
      const timeout = setTimeout(() => {
        setJustSubmitted(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [justSubmitted]);

  const onSubmit = (newSettings: Settings) => {
    updateSettings(newSettings);
    setJustSubmitted(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="m-2 w-96">
          <CardHeader>
            <CardTitle>Better Jow</CardTitle>
            <CardDescription>
              Améliorez les suggestions de menus Jow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <FormLabel htmlFor="active-better-jow">
                      Activer les suggestions améliorées
                    </FormLabel>
                    <FormDescription>
                      Le système de suggestions conçu par Jow est remplacé pour
                      vous proposer des menus plus variés.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      id="active-better-jow"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {justSubmitted ? (
                <>
                  <span className="mr-1 text-xl">✔</span>Paramètres enregistrés
                </>
              ) : (
                'Enregistrez vos paramètres'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export { SettingsForm };
