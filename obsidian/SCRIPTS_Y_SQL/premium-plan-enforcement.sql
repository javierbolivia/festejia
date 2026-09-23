-- FESTEJIA — Reglas de plan Premium en base de datos
-- Ejecutar una vez desde Supabase SQL Editor.
-- Complementa los bloqueos de interfaz: la base impide exceder el límite
-- aunque un cliente intente llamar a Supabase directamente.

create or replace function public.validar_limite_invitados_por_plan()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  limite integer;
  total_actual integer;
begin
  select case p.plan
    when 'exclusive' then 9999
    when 'premium' then 150
    else 50
  end into limite
  from profiles p
  join eventos e on e.user_id = p.id
  where e.id = new.evento_id and p.role = 'client';

  if limite is null then
    raise exception 'El evento no pertenece a un cliente activo';
  end if;

  select count(*) into total_actual
  from invitados i
  where i.evento_id = new.evento_id;

  if total_actual >= limite then
    raise exception 'El plan permite como máximo % invitados', limite;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_validar_limite_invitados_por_plan on invitados;
create trigger trg_validar_limite_invitados_por_plan
before insert on invitados
for each row execute function public.validar_limite_invitados_por_plan();
